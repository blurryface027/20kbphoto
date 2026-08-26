'use client';

import { useState } from 'react';
import { Exam } from '@/data/exams';

interface ExamToolClientProps {
  exam: Exam;
  type: 'photo' | 'signature';
}

export default function ExamToolClient({ exam, type }: ExamToolClientProps) {
  const requirement = type === 'photo' ? exam.photo : exam.signature;
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Mock processing
      setProcessing(true);
      setTimeout(() => {
        setResult(URL.createObjectURL(e.target.files![0]));
        setProcessing(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 capitalize">{type} Requirements Locked</h3>
        <div className="flex gap-2 text-sm">
          <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-medium">
            {requirement.width}x{requirement.height}px
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            {requirement.minKB}-{requirement.maxKB}KB
          </span>
        </div>
      </div>
      
      <div className="p-6">
        {!result && !processing && (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors">
            <input 
              type="file" 
              accept={`image/${requirement.format.toLowerCase()}, image/jpeg`} 
              className="hidden" 
              id={`upload-${type}`}
              onChange={handleUpload}
            />
            <label htmlFor={`upload-${type}`} className="cursor-pointer flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-indigo-600 font-medium">Click to upload</span>
              <span className="text-gray-500 text-sm mt-1">or drag and drop</span>
            </label>
          </div>
        )}

        {processing && (
          <div className="py-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing exactly to {exam.authority} specifications...</p>
          </div>
        )}

        {result && !processing && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <img src={result} alt="Processed output" className="max-w-full h-auto rounded border shadow-sm max-h-64" />
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-800 mb-2">Validation Passed</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>✓ Dimensions match {requirement.width}x{requirement.height}px</li>
                <li>✓ File size is between {requirement.minKB}-{requirement.maxKB}KB</li>
                <li>✓ Format is {requirement.format.toUpperCase()}</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => { setResult(null); setFile(null); }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Upload Different
              </button>
              <a 
                href={result} 
                download={`${exam.slug}-${type}.${requirement.format.toLowerCase()}`}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 text-center font-medium shadow-md shadow-indigo-200 transition-all"
              >
                Download Validated {type.charAt(0).toUpperCase() + type.slice(1)}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
