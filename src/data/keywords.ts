export interface KeywordMapping {
  keyword: string;
  volume: 'high' | 'medium' | 'low';
  intent: 'tool' | 'info' | 'info+tool';
  targetURL: string;
  category: string;
  priority: 'P0' | 'P1' | 'P2';
}

export const keywords: KeywordMapping[] = [
  { keyword: 'image compressor online', volume: 'high', intent: 'tool', targetURL: '/tools/image-compressor', category: 'compress', priority: 'P0' },
  { keyword: 'reduce image size', volume: 'high', intent: 'tool', targetURL: '/tools/image-compressor', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 20kb', volume: 'high', intent: 'tool', targetURL: '/tools/20kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 50kb', volume: 'high', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 100kb', volume: 'high', intent: 'tool', targetURL: '/tools/100kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 200kb', volume: 'high', intent: 'tool', targetURL: '/tools/200kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 30kb', volume: 'medium', intent: 'tool', targetURL: '/tools/30kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress image to 10kb', volume: 'medium', intent: 'tool', targetURL: '/tools/10kb', category: 'compress', priority: 'P1' },
  { keyword: 'compress image to 40kb', volume: 'low', intent: 'tool', targetURL: '/tools/40kb', category: 'compress', priority: 'P1' },
  { keyword: 'compress image to 150kb', volume: 'medium', intent: 'tool', targetURL: '/tools/150kb', category: 'compress', priority: 'P1' },
  { keyword: 'compress image to 300kb', volume: 'medium', intent: 'tool', targetURL: '/tools/300kb', category: 'compress', priority: 'P1' },
  { keyword: 'compress image to 60kb', volume: 'low', intent: 'tool', targetURL: '/tools/60kb', category: 'compress', priority: 'P2' },
  { keyword: 'compress image to 70kb', volume: 'low', intent: 'tool', targetURL: '/tools/70kb', category: 'compress', priority: 'P2' },
  { keyword: 'compress image to 500kb', volume: 'low', intent: 'tool', targetURL: '/tools/500kb', category: 'compress', priority: 'P2' },
  
  { keyword: 'image resizer', volume: 'high', intent: 'tool', targetURL: '/tools/image-resizer', category: 'resize', priority: 'P0' },
  { keyword: 'resize image online', volume: 'high', intent: 'tool', targetURL: '/tools/image-resizer', category: 'resize', priority: 'P0' },
  { keyword: 'resize photo in kb', volume: 'medium', intent: 'tool', targetURL: '/tools/photo-size-reducer', category: 'compress', priority: 'P1' },
  
  { keyword: 'signature resizer', volume: 'high', intent: 'tool', targetURL: '/tools/signature-resizer', category: 'signature', priority: 'P0' },
  { keyword: 'resize signature', volume: 'high', intent: 'tool', targetURL: '/tools/signature-resizer', category: 'signature', priority: 'P0' },
  { keyword: 'signature compressor', volume: 'medium', intent: 'tool', targetURL: '/tools/signature-compressor', category: 'compress', priority: 'P0' },
  
  { keyword: 'passport size photo maker', volume: 'high', intent: 'tool', targetURL: '/tools/passport-photo-maker', category: 'photo', priority: 'P0' },
  { keyword: 'make passport photo', volume: 'medium', intent: 'tool', targetURL: '/tools/passport-photo-maker', category: 'photo', priority: 'P1' },
  
  { keyword: 'image to jpg', volume: 'high', intent: 'tool', targetURL: '/tools/image-to-jpg', category: 'convert', priority: 'P0' },
  { keyword: 'png to jpg', volume: 'high', intent: 'tool', targetURL: '/tools/png-to-jpg', category: 'convert', priority: 'P0' },
  { keyword: 'jpg to png', volume: 'medium', intent: 'tool', targetURL: '/tools/jpg-to-png', category: 'convert', priority: 'P1' },
  { keyword: 'webp to jpg', volume: 'medium', intent: 'tool', targetURL: '/tools/webp-to-jpg', category: 'convert', priority: 'P1' },
  { keyword: 'jpg to webp', volume: 'low', intent: 'tool', targetURL: '/tools/jpg-to-webp', category: 'convert', priority: 'P2' },
  { keyword: 'png to webp', volume: 'low', intent: 'tool', targetURL: '/tools/png-to-webp', category: 'convert', priority: 'P2' },
  
  { keyword: 'change image dpi', volume: 'medium', intent: 'tool', targetURL: '/tools/change-image-dpi', category: 'utility', priority: 'P1' },
  { keyword: 'crop image', volume: 'high', intent: 'tool', targetURL: '/tools/crop-image', category: 'resize', priority: 'P1' },
  { keyword: 'rotate image', volume: 'low', intent: 'tool', targetURL: '/tools/rotate-image', category: 'utility', priority: 'P2' },
  { keyword: 'flip image', volume: 'low', intent: 'tool', targetURL: '/tools/flip-image', category: 'utility', priority: 'P2' },
  
  { keyword: 'resize image to 275x354', volume: 'low', intent: 'tool', targetURL: '/tools/275x354', category: 'resize', priority: 'P0' },
  { keyword: 'resize image to 200x230', volume: 'low', intent: 'tool', targetURL: '/tools/200x230', category: 'resize', priority: 'P0' },
  { keyword: 'resize image to 200x240', volume: 'low', intent: 'tool', targetURL: '/tools/200x240', category: 'resize', priority: 'P0' },
  { keyword: 'resize image to 300x300', volume: 'low', intent: 'tool', targetURL: '/tools/300x300', category: 'resize', priority: 'P1' },
  { keyword: 'resize image to 400x400', volume: 'low', intent: 'tool', targetURL: '/tools/400x400', category: 'resize', priority: 'P1' },
  { keyword: 'resize image to 350x450', volume: 'low', intent: 'tool', targetURL: '/tools/350x450', category: 'resize', priority: 'P0' },
  
  { keyword: 'resize signature to 140x60', volume: 'low', intent: 'tool', targetURL: '/tools/140x60', category: 'signature', priority: 'P0' },
  { keyword: 'resize signature to 200x80', volume: 'low', intent: 'tool', targetURL: '/tools/200x80', category: 'signature', priority: 'P1' },
  { keyword: 'resize signature to 275x118', volume: 'low', intent: 'tool', targetURL: '/tools/275x118', category: 'signature', priority: 'P0' },
  
  { keyword: 'ssc signature size', volume: 'high', intent: 'info+tool', targetURL: '/tools/signature-resizer', category: 'signature', priority: 'P0' },
  { keyword: 'upsc photo requirement', volume: 'high', intent: 'info+tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P0' },
  { keyword: 'ibps photo size in cm', volume: 'medium', intent: 'info+tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P1' },
  { keyword: 'sbi po signature format', volume: 'medium', intent: 'info+tool', targetURL: '/tools/signature-resizer', category: 'signature', priority: 'P1' },
  { keyword: 'rrb ntpc photo maker', volume: 'medium', intent: 'tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P1' },
  { keyword: 'neet photo generator', volume: 'high', intent: 'tool', targetURL: '/tools/passport-photo-maker', category: 'photo', priority: 'P0' },
  { keyword: 'jee mains photograph rules', volume: 'high', intent: 'info+tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P0' },
  { keyword: 'ctet signature upload problem', volume: 'medium', intent: 'info', targetURL: '/tools/signature-resizer', category: 'signature', priority: 'P1' },
  { keyword: 'gate photo crop', volume: 'low', intent: 'tool', targetURL: '/tools/crop-image', category: 'resize', priority: 'P2' },
  { keyword: 'lic aao photo size', volume: 'low', intent: 'info+tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P2' },
  { keyword: 'ndm photo to jpg', volume: 'low', intent: 'tool', targetURL: '/tools/image-to-jpg', category: 'convert', priority: 'P2' },
  
  { keyword: 'reduce image size to 20kb', volume: 'high', intent: 'tool', targetURL: '/tools/20kb', category: 'compress', priority: 'P0' },
  { keyword: 'convert photo to 50kb', volume: 'high', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'make image 100kb', volume: 'medium', intent: 'tool', targetURL: '/tools/100kb', category: 'compress', priority: 'P0' },
  { keyword: 'compress pic to 20kb', volume: 'medium', intent: 'tool', targetURL: '/tools/20kb', category: 'compress', priority: 'P0' },
  { keyword: 'resize photo to 50kb', volume: 'high', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  
  { keyword: 'image resize 3.5cm x 4.5cm', volume: 'medium', intent: 'tool', targetURL: '/tools/350x450', category: 'resize', priority: 'P0' },
  { keyword: 'signature size 4cm x 2cm', volume: 'low', intent: 'tool', targetURL: '/tools/400x200', category: 'signature', priority: 'P1' },
  
  { keyword: 'aadhar card photo size', volume: 'low', intent: 'info+tool', targetURL: '/tools/document-image-resizer', category: 'document', priority: 'P1' },
  { keyword: 'pan card signature size', volume: 'low', intent: 'info+tool', targetURL: '/tools/document-image-resizer', category: 'document', priority: 'P1' },
  { keyword: 'voter id photo resize', volume: 'low', intent: 'tool', targetURL: '/tools/document-image-resizer', category: 'document', priority: 'P2' },
  { keyword: 'driving license photo size', volume: 'low', intent: 'info+tool', targetURL: '/tools/document-image-resizer', category: 'document', priority: 'P2' },
  
  { keyword: 'photo converter to jpg', volume: 'high', intent: 'tool', targetURL: '/tools/image-to-jpg', category: 'convert', priority: 'P0' },
  { keyword: 'convert heic to jpg for exam', volume: 'medium', intent: 'tool', targetURL: '/tools/image-to-jpg', category: 'convert', priority: 'P1' },
  { keyword: 'exam form photo editor', volume: 'high', intent: 'tool', targetURL: '/tools/image-resizer', category: 'resize', priority: 'P0' },
  
  { keyword: 'compress image to 50kb for upsc', volume: 'medium', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'resize photo to 20kb for ssc', volume: 'high', intent: 'tool', targetURL: '/tools/20kb', category: 'compress', priority: 'P0' },
  
  { keyword: 'online image compressor to 50kb', volume: 'high', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'best photo resizer for exams', volume: 'medium', intent: 'tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P1' },
  
  { keyword: 'convert signature to jpg 20kb', volume: 'medium', intent: 'tool', targetURL: '/tools/20kb', category: 'signature', priority: 'P0' },
  { keyword: 'resize photo online 50kb free', volume: 'high', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'crop signature for online form', volume: 'medium', intent: 'tool', targetURL: '/tools/signature-cropper', category: 'signature', priority: 'P1' },
  
  { keyword: 'change photo size to 100kb', volume: 'medium', intent: 'tool', targetURL: '/tools/100kb', category: 'compress', priority: 'P0' },
  { keyword: 'decrease image size to 20kb', volume: 'medium', intent: 'tool', targetURL: '/tools/20kb', category: 'compress', priority: 'P0' },
  
  { keyword: 'resize dimension 200x230', volume: 'low', intent: 'tool', targetURL: '/tools/200x230', category: 'resize', priority: 'P0' },
  { keyword: 'resize dimension 275x354', volume: 'low', intent: 'tool', targetURL: '/tools/275x354', category: 'resize', priority: 'P0' },
  
  { keyword: 'online photo maker', volume: 'high', intent: 'tool', targetURL: '/tools/passport-photo-maker', category: 'photo', priority: 'P0' },
  { keyword: 'reduce signature size to 10kb', volume: 'medium', intent: 'tool', targetURL: '/tools/10kb', category: 'signature', priority: 'P1' },
  { keyword: 'convert to jpg and compress to 50kb', volume: 'medium', intent: 'tool', targetURL: '/tools/image-to-jpg', category: 'convert', priority: 'P0' },
  { keyword: 'image size 50kb to 100kb', volume: 'low', intent: 'tool', targetURL: '/tools/100kb', category: 'compress', priority: 'P1' },
  { keyword: 'photo signature resize together', volume: 'low', intent: 'tool', targetURL: '/tools/photo-resizer', category: 'utility', priority: 'P2' },
  { keyword: 'exam photo requirements generator', volume: 'medium', intent: 'tool', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P1' },
  { keyword: 'upsc mains photo format', volume: 'low', intent: 'info', targetURL: '/tools/photo-resizer', category: 'photo', priority: 'P2' },
  { keyword: 'reduce size of image to 50kb without losing quality', volume: 'medium', intent: 'tool', targetURL: '/tools/50kb', category: 'compress', priority: 'P0' },
  { keyword: 'convert photo to 10kb 20kb 30kb 50kb', volume: 'low', intent: 'tool', targetURL: '/tools/image-compressor', category: 'compress', priority: 'P1' },
  { keyword: 'resize image without losing quality online', volume: 'high', intent: 'tool', targetURL: '/tools/image-resizer', category: 'resize', priority: 'P0' }
];
