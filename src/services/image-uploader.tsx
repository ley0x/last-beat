'use client';

import React, { useRef, useState, ChangeEventHandler } from 'react';
import { File } from 'lucide-react';

import Header from "@common/header"

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB


type Props = {
  handleLoad: ((this: FileReader, ev: ProgressEvent<FileReader>) => void);
}

export const ImageUploader = ({ handleLoad }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState('');

  const [fileName, setFileName] = useState('');

  const handleImageChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (file.size > MAX_SIZE) {
      setInvalid(true);
      setError('Image too large.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setInvalid(true);
      setError("It's not an image.");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = handleLoad;
      setFileName(file.name);
      reader.readAsDataURL(file);
    } catch (e) {
      setInvalid(true);
      console.error(e);
      setError("Can't read image.");
      return;
    }
  };


  return (
    <div className="w-full max-w-xs">
      <Header as="h5">Upload a background image</Header>
      <div className="space-y-2 w-full">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image-upload" className="border p-2 rounded-lg"><File className="text-xl" /> {fileName ? fileName : "Select your background image"}</Label>
          <div className="relative">
            <Input
              ref={inputRef}
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          {invalid && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};
