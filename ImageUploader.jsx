import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { UploadFile } from '@/api/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Copy, Check, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ImageUploader() {
    const { t } = useLanguage();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setUploadedUrl('');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            const result = await UploadFile({ file: selectedFile });
            setUploadedUrl(result.file_url);
            setSelectedFile(null);
        } catch (error) {
            console.error('Upload failed:', error);
            alert(t.image_uploader_fail_alert);
        } finally {
            setIsUploading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(uploadedUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-2xl mx-auto pt-32 px-6">
                <div className="text-center mb-12">
                    <h1 className="font-heading text-4xl font-bold mb-4">{t.image_uploader_title}</h1>
                    <p className="text-gray-400">{t.image_uploader_subtitle}</p>
                </div>

                <div className="bg-[#111] rounded-lg p-8">
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-3">{t.image_uploader_select_file}</label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="bg-gray-900 border-gray-700"
                        />
                    </div>

                    {selectedFile && (
                        <div className="mb-6">
                            <p className="text-sm text-gray-400 mb-3">{t.image_uploader_selected}: {selectedFile.name}</p>
                            <div className="flex justify-center">
                                <img 
                                    src={URL.createObjectURL(selectedFile)} 
                                    alt="Preview" 
                                    className="max-w-full max-h-64 rounded-lg"
                                />
                            </div>
                        </div>
                    )}

                    <Button 
                        onClick={handleUpload}
                        disabled={!selectedFile || isUploading}
                        className="w-full btn-primary flex items-center justify-center gap-2"
                    >
                        <Upload size={20} />
                        {isUploading ? t.image_uploader_uploading_btn : t.image_uploader_upload_btn}
                    </Button>

                    {uploadedUrl && (
                        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                            <h3 className="font-bold text-green-400 mb-2">{t.image_uploader_success_title}</h3>
                            <p className="text-sm text-gray-400 mb-3">{t.image_uploader_url_label}</p>
                            <div className="flex gap-2">
                                <Input
                                    value={uploadedUrl}
                                    readOnly
                                    className="bg-gray-900 border-gray-700 text-sm"
                                />
                                <Button
                                    onClick={copyToClipboard}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1"
                                >
                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                    {copied ? t.image_uploader_copied_btn : t.image_uploader_copy_btn}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="text-center mt-8">
                     <Link 
                        to={createPageUrl('Home')} 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} /> {t.image_uploader_go_back}
                    </Link>
                </div>
            </div>
        </div>
    );
}