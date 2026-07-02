
export interface FormData {
  [key: string]: any;
}

export interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  setActiveField?: (field: string | null) => void;
  activeField?: string | null;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}
