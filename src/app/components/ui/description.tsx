import React from 'react'

function Description({ description, name }: { description: string; name: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/[0.04] my-3">
      <h2 className="text-sm font-bold text-[#0A0A0A] capitalize mb-2">{name}</h2>
      <p className="text-sm text-black/50 leading-relaxed overflow-auto">
        {description || 'No description available.'}
      </p>
    </div>
  );
}

export default Description;
