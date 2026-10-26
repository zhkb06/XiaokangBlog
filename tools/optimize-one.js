/**
 * 单文件图片优化（结果写 stdout，由 shell 重定向落盘，规避 Node 写盘限制）
 * 用法：node tools/optimize-one.js <图片路径> > 输出文件
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const file = process.argv[2];
if (!file) {
  process.stderr.write('缺少文件路径\n');
  process.exit(1);
}

const ext = path.extname(file).toLowerCase();
const isAvatar = path.basename(file).toLowerCase() === 'myself.jpg';
const maxW = isAvatar ? 400 : 1400;
const original = fs.statSync(file).size;

(async () => {
  const pipeline = sharp(file).rotate().resize({ width: maxW, withoutEnlargement: true });
  const buffer = ext === '.png'
    ? await pipeline.png({ compressionLevel: 9, palette: true, quality: 80 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  if (buffer.length < original) {
    process.stderr.write(`${file}\t${original}\t${buffer.length}\n`);
    process.stdout.write(buffer);
  } else {
    process.stderr.write(`${file}\t${original}\t${original}\tSKIP\n`);
    process.stdout.write(fs.readFileSync(file));
  }
})();
