import * as React from 'react';

const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const imageContainerRef = React.useRef<HTMLDivElement>(null);

  const handleSliderMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ('touches' in event ? event.touches[0].clientX : event.clientX) - rect.left;
    const percentage = (x / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">From Chaos to Clarity</h2>
        <p className="mt-2 text-lg text-gray-400">Experience the GSTGenie transformation.</p>
      </div>
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-ew-resize select-none"
        onMouseMove={handleSliderMove}
        onTouchMove={handleSliderMove}
      >
        {/* Before Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542744095-291d1f67b221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="Before GSTGenie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Messy Paperwork</h3>
          </div>
        </div>

        {/* After Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="After GSTGenie"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <h3 className="text-white text-3xl font-bold">Digital Dashboard</h3>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-accent cursor-pointer"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
