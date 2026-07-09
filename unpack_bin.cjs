const fs=require('fs')
const zlib=require('zlib')
const parts=[0,1,2].map(i=>fs.readFileSync('g'+i+'.bin'))
const gz=Buffer.concat(parts)
const files=JSON.parse(zlib.gunzipSync(gz).toString('utf8'))
for (const f of files) {
  const p=require('path')
  const dir=p.dirname(f.file)
  if (dir && dir !== '.') fs.mkdirSync(dir,{recursive:true})
  fs.writeFileSync(f.file, f.data)
}
console.log('unpacked', files.length)
