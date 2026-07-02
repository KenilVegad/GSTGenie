
import React, { useState, useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Download, Edit, CheckCircle, RefreshCw, PlusCircle, Trash2, ArrowRight } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Define the types for our data records
interface SalesRecord {
  id: number;
  invoiceNo: string;
  date: string;
  customerName: string;
  gstin: string;
  taxableValue: number;
  gstRate: number;
}

interface PurchaseRecord {
  id: number;
  invoiceNo: string;
  date: string;
  supplierName: string;
  gstin: string;
  taxableValue: number;
  gstRate: number;
  itcClaimed: number;
}

// Prop types for our reusable components
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface TdInputProps {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}

interface DataTableProps {
    title: string;
    children: React.ReactNode;
}

interface SummaryCardProps {
    title: string;
    value: number;
    isCurrency?: boolean;
    isPayable?: boolean;
}

const AutoGstReturnGenerator: React.FC = () => {
  const { isDark } = useTheme();
  
  const [view, setView] = useState<'form' | 'summary' | 'submitted'>('form');
  const [gstin, setGstin] = useState('27AAAPL1234C1ZV');
  const [legalName, setLegalName] = useState('ABC Pvt Ltd');
  const [tradeName, setTradeName] = useState('ABC Enterprises');
  const [month, setMonth] = useState<string>('August');
  const [year, setYear] = useState<string>('2025');

  const [sales, setSales] = useState<SalesRecord[]>([
    { id: 1, invoiceNo: 'INV-001', date: '2023-01-10', customerName: 'Acme Corp', gstin: '29AABBCC1234D1Z5', taxableValue: 500000, gstRate: 18 },
  ]);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([
    { id: 1, invoiceNo: 'PUR-001', date: '2023-01-15', supplierName: 'Supply Co', gstin: '27EEFFGG5678H1Z3', taxableValue: 200000, gstRate: 10, itcClaimed: 20000 },
  ]);

  const summary = useMemo(() => {
    const totalSales = sales.reduce((acc, item) => acc + (item.taxableValue || 0), 0);
    const totalGstCollected = sales.reduce((acc, item) => acc + ((item.taxableValue || 0) * (item.gstRate || 0) / 100), 0);
    const totalPurchases = purchases.reduce((acc, item) => acc + (item.taxableValue || 0), 0);
    const inwardTax = purchases.reduce((acc, item) => acc + ((item.taxableValue || 0) * (item.gstRate || 0) / 100), 0);
    const totalItcAvailable = purchases.reduce((acc, item) => acc + (item.itcClaimed || 0), 0);
    const netGstPayable = totalGstCollected - totalItcAvailable;

    return { totalSales, totalGstCollected, totalPurchases, inwardTax, totalItcAvailable, netGstPayable };
  }, [sales, purchases]);

  const addSale = () => setSales([...sales, { id: Date.now(), invoiceNo: '', date: '', customerName: '', gstin: '', taxableValue: 0, gstRate: 18 }]);
  const removeSale = (id: number) => setSales(sales.filter(s => s.id !== id));
  const handleSaleChange = (id: number, field: keyof SalesRecord, value: any) => {
    setSales(sales.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addPurchase = () => setPurchases([...purchases, { id: Date.now(), invoiceNo: '', date: '', supplierName: '', gstin: '', taxableValue: 0, gstRate: 18, itcClaimed: 0 }]);
  const removePurchase = (id: number) => setPurchases(purchases.filter(p => p.id !== id));
  const handlePurchaseChange = (id: number, field: keyof PurchaseRecord, value: any) => {
    setPurchases(purchases.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleGenerateSummary = () => setView('summary');
  const handleEdit = () => setView('form');
  const handleAccept = () => setView('submitted');
  const handleGenerateAnother = () => setView('form');

  const handleDownload = () => {
    try {
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('GST RETURN DOCUMENT', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

      autoTable(doc, {
          startY: 30,
          head: [[{content: 'I hereby declare that the information given above is true and correct to the best of my', colSpan: 2, styles: {halign: 'left', fillColor: '#FFFFFF', textColor: '#000000'}}]],
          body: Object.entries({
              'GSTIN:': gstin,
              'Legal Name:': legalName,
              'Trade Name:': tradeName,
              'Return Period:': `${month} ${year}`
          }).map(([key, value]) => [key, value]),
          theme: 'grid',
          styles: { fillColor: '#E8E8E8', textColor: '#000000', fontStyle: 'bold' },
          columnStyles: { 1: { fillColor: '#FFFFFF', fontStyle: 'normal' } }
      });
      
      const outwardIgst = summary.totalGstCollected * 0.5;
      const outwardCgst = summary.totalGstCollected * 0.25;
      const outwardSgst = summary.totalGstCollected * 0.25;
      const inwardIgst = summary.inwardTax * 0.5;
      const inwardCgst = summary.inwardTax * 0.25;
      const inwardSgst = summary.inwardTax * 0.25;

      const taxBody = [
          ['Outward Supplies', summary.totalSales.toLocaleString(), outwardIgst.toLocaleString(), outwardCgst.toLocaleString(), outwardSgst.toLocaleString(), summary.totalGstCollected.toLocaleString()],
          ['Inward Supplies (RCM)', summary.totalPurchases.toLocaleString(), inwardIgst.toLocaleString(), inwardCgst.toLocaleString(), inwardSgst.toLocaleString(), summary.inwardTax.toLocaleString()],
      ];

      const totalTaxable = summary.totalSales + summary.totalPurchases;
      const totalIgst = outwardIgst + inwardIgst;
      const totalCgst = outwardCgst + inwardCgst;
      const totalSgst = outwardSgst + inwardSgst;
      const totalTax = summary.totalGstCollected + summary.inwardTax;

      autoTable(doc, {
          startY: (doc as any).lastAutoTable.finalY + 2,
          head: [['Description', 'Taxable Value', 'IGST', 'CGST', 'SGST', 'Total Tax']],
          body: taxBody,
          foot: [[
              {content: 'Total', styles: {fontStyle: 'bold'}},
              {content: totalTaxable.toLocaleString(), styles: {fontStyle: 'bold'}},
              {content: totalIgst.toLocaleString(), styles: {fontStyle: 'bold'}},
              {content: totalCgst.toLocaleString(), styles: {fontStyle: 'bold'}},
              {content: totalSgst.toLocaleString(), styles: {fontStyle: 'bold'}},
              {content: totalTax.toLocaleString(), styles: {fontStyle: 'bold'}}
          ]],
          theme: 'grid',
          headStyles: { fillColor: '#E8E8E8', textColor: '#000000', fontStyle: 'bold' }
      });

      const finalY = (doc as any).lastAutoTable.finalY;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('knowledge and belief.', 14, finalY + 10);
      doc.text('Place:', 14, finalY + 25);
      doc.text('BHAVNAGAR', 50, finalY + 25);
      doc.text('Date:', 14, finalY + 32);
      doc.text(new Date().toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}).replace(/ /g, '-'), 50, finalY + 32);
      doc.text('Authorized Signatory:', 14, finalY + 39);
      doc.line(50, finalY + 40, 100, finalY + 40);

      doc.save(`GST_Return_${month}_${year}.pdf`);
    } catch (error) {
      alert('An error occurred while generating the PDF. Please check the console for more details.');
      console.error('PDF Generation Error:', error);
    }
  };

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const years = ["2024", "2025", "2026"];
  
  if (view === 'submitted') {
    return (
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} text-center`}>
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Your GST return has been submitted successfully</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-8`}>This is a demo submission. No data has been sent to any government portal.</p>
            <button onClick={handleGenerateAnother} className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center mx-auto text-lg font-semibold">
              <RefreshCw className="w-5 h-5 mr-3" />Generate Another Return
            </button>
      </div>
    )
  }

  if (view === 'summary') {
    return (
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
            <h3 className="text-2xl font-bold mb-6">GST Return Summary for {month} {year}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <SummaryCard title="Total Sales" value={summary.totalSales} isCurrency/>
                <SummaryCard title="GST Collected" value={summary.totalGstCollected} isCurrency/>
                <SummaryCard title="Total Purchases" value={summary.totalPurchases} isCurrency/>
                <SummaryCard title="ITC Available" value={summary.totalItcAvailable} isCurrency/>
                <SummaryCard title="Net GST Payable" value={summary.netGstPayable} isCurrency isPayable/>
            </div>
            <div className="flex justify-end space-x-4">
                <button onClick={handleEdit} className="px-5 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center font-semibold"><Edit className="w-4 h-4 mr-2" />Edit</button>
                <button onClick={handleDownload} className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center font-semibold"><Download className="w-4 h-4 mr-2" />Download PDF</button>
                <button onClick={handleAccept} className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center font-semibold"><CheckCircle className="w-4 h-4 mr-2" />Accept & Submit</button>
            </div>
        </div>
    )
  }

  return (
    <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h3 className="text-2xl font-bold mb-2">GST Auto Return Generator</h3>
        <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Fill in your business, sales, and purchase data to generate a dummy GST return report.</p>

        <div className={`mb-8 p-4 border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <h4 className="text-xl font-semibold mb-4">Business Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="GSTIN" value={gstin} onChange={e => setGstin(e.target.value)} />
                <InputField label="Legal Name" value={legalName} onChange={e => setLegalName(e.target.value)} />
                <InputField label="Trade Name" value={tradeName} onChange={e => setTradeName(e.target.value)} />
            </div>
        </div>

        <div className="mb-8 max-w-sm">
            <label htmlFor="month" className="block text-sm font-medium mb-2">Select Filing Period</label>
            <div className="flex gap-4">
                <select id="month" value={month} onChange={e => setMonth(e.target.value)} className={`w-full p-2.5 rounded-md ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                    {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select id="year" value={year} onChange={e => setYear(e.target.value)} className={`w-full p-2.5 rounded-md ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
        </div>

        <DataTable title="Sales Data (Outward Supplies)">
            <thead className={` ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>{['Invoice No', 'Date', 'Customer Name', 'GSTIN', 'Taxable Value', 'GST Rate (%)', 'Tax Amount', ''].map(h => <th key={h} className="p-3 text-left text-xs font-semibold uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {sales.map((sale) => (
                    <tr key={sale.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-2"><TdInput value={sale.invoiceNo} onChange={e => handleSaleChange(sale.id, 'invoiceNo', e.target.value)} placeholder="INV-001"/></td>
                        <td className="p-2"><TdInput type="date" value={sale.date} onChange={e => handleSaleChange(sale.id, 'date', e.target.value)}/></td>
                        <td className="p-2"><TdInput value={sale.customerName} onChange={e => handleSaleChange(sale.id, 'customerName', e.target.value)} placeholder="Customer"/></td>
                        <td className="p-2"><TdInput value={sale.gstin} onChange={e => handleSaleChange(sale.id, 'gstin', e.target.value)} placeholder="GSTIN"/></td>
                        <td className="p-2"><TdInput type="number" value={sale.taxableValue} onChange={e => handleSaleChange(sale.id, 'taxableValue', parseFloat(e.target.value) || 0)} placeholder="0.00"/></td>
                        <td className="p-2"><TdInput type="number" value={sale.gstRate} onChange={e => handleSaleChange(sale.id, 'gstRate', parseFloat(e.target.value) || 0)} placeholder="18"/></td>
                        <td className="p-2 text-sm text-center">{((sale.taxableValue || 0) * (sale.gstRate || 0) / 100).toFixed(2)}</td>
                        <td className="p-2"><button onClick={() => removeSale(sale.id)} className={`text-red-500 hover:text-red-700 ${sales.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={sales.length === 1}><Trash2 size={18}/></button></td>
                    </tr>
                ))}
            </tbody>
            <tfoot><tr><td colSpan={8} className="p-2"><button onClick={addSale} className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"><PlusCircle size={16} className="mr-2"/>Add Row</button></td></tr></tfoot>
        </DataTable>

        <DataTable title="Purchase Data (Inward Supplies)">
            <thead className={` ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>{['Invoice No', 'Date', 'Supplier Name', 'GSTIN', 'Taxable Value', 'GST Rate (%)', 'Tax Amount', 'ITC Claimed', ''].map(h => <th key={h} className="p-3 text-left text-xs font-semibold uppercase tracking-wider">{h}</th>)}</tr>
            </thead>
            <tbody className={`${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                {purchases.map((purchase) => (
                    <tr key={purchase.id} className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="p-2"><TdInput value={purchase.invoiceNo} onChange={e => handlePurchaseChange(purchase.id, 'invoiceNo', e.target.value)} placeholder="PUR-001"/></td>
                        <td className="p-2"><TdInput type="date" value={purchase.date} onChange={e => handlePurchaseChange(purchase.id, 'date', e.target.value)}/></td>
                        <td className="p-2"><TdInput value={purchase.supplierName} onChange={e => handlePurchaseChange(purchase.id, 'supplierName', e.target.value)} placeholder="Supplier"/></td>
                        <td className="p-2"><TdInput value={purchase.gstin} onChange={e => handlePurchaseChange(purchase.id, 'gstin', e.target.value)} placeholder="GSTIN"/></td>
                        <td className="p-2"><TdInput type="number" value={purchase.taxableValue} onChange={e => handlePurchaseChange(purchase.id, 'taxableValue', parseFloat(e.target.value) || 0)} placeholder="0.00"/></td>
                        <td className="p-2"><TdInput type="number" value={purchase.gstRate} onChange={e => handlePurchaseChange(purchase.id, 'gstRate', parseFloat(e.target.value) || 0)} placeholder="18"/></td>
                        <td className="p-2 text-sm text-center">{((purchase.taxableValue || 0) * (purchase.gstRate || 0) / 100).toFixed(2)}</td>
                        <td className="p-2"><TdInput type="number" value={purchase.itcClaimed} onChange={e => handlePurchaseChange(purchase.id, 'itcClaimed', parseFloat(e.target.value) || 0)} placeholder="0.00"/></td>
                        <td className="p-2"><button onClick={() => removePurchase(purchase.id)} className={`text-red-500 hover:text-red-700 ${purchases.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={purchases.length === 1}><Trash2 size={18}/></button></td>
                    </tr>
                ))}
            </tbody>
            <tfoot><tr><td colSpan={9} className="p-2"><button onClick={addPurchase} className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"><PlusCircle size={16} className="mr-2"/>Add Row</button></td></tr></tfoot>
        </DataTable>

        <div className="mt-8 text-right">
            <button onClick={handleGenerateSummary} className="px-8 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center font-semibold text-lg ml-auto">
                Generate GST Summary <ArrowRight className="w-5 h-5 ml-3" />
            </button>
        </div>
    </div>
  );
};

const InputField: React.FC<InputFieldProps> = ({label, value, onChange}) => {
    const { isDark } = useTheme();
    return (
        <div>
            <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{label}</label>
            <input type="text" value={value} onChange={onChange} className={`w-full ${isDark ? 'bg-gray-700/50 border-gray-600/50' : 'bg-white border-gray-300'} border rounded-md px-3 py-3 focus:ring-indigo-500 focus:border-indigo-500`} />
        </div>
    );
}

const TdInput: React.FC<TdInputProps> = ({ value, onChange, type = 'text', placeholder = '' }) => {
    const { isDark } = useTheme();
    return (
        <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full p-1.5 rounded-md text-sm ${isDark ? 'bg-gray-700 border-gray-600 focus:bg-gray-600' : 'bg-white border-gray-300 focus:bg-gray-50'} border transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
    );
};

const DataTable: React.FC<DataTableProps> = ({ title, children }) => {
    const { isDark } = useTheme();
    return (
        <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">{title}</h4>
            <div className={`overflow-x-auto rounded-lg border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    {children}
                </table>
            </div>
        </div>
    )
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, isCurrency, isPayable }) => {
    const { isDark } = useTheme();
    const formattedValue = isCurrency 
      ? `₹ ${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
      : value.toString();
    
    const valueColor = isPayable ? (value >= 0 ? 'text-red-500' : 'text-green-500') : (isDark ? 'text-white' : 'text-gray-900');

    return (
        <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
            <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
            <p className={`text-2xl font-bold ${valueColor}`}>{formattedValue}</p>
        </div>
    )
}

export default AutoGstReturnGenerator;
