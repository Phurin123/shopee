import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'ไม่พบไฟล์' }, { status: 400 });
    }

    // ตรวจสอบประเภทไฟล์
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'รองรับเฉพาะไฟล์รูปภาพ' }, { status: 400 });
    }

    // ตรวจสอบขนาดไฟล์ (ไม่เกิน 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'ไฟล์ต้องมีขนาดไม่เกิน 5MB' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // สร้างชื่อไฟล์ไม่ซ้ำกัน
    const ext = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // ส่งคืน URL ที่เข้าถึงได้
    const imageUrl = `/uploads/${fileName}`;
    return NextResponse.json({ success: true, url: imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'อัปโหลดล้มเหลว' }, { status: 500 });
  }
}