function ConvertCRC16(str) {
  let crc = 0xFFFF;
  const strlen = str.length;
  for (let c = 0; c < strlen; c++) {
    crc ^= str.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  let hex = (crc & 0xFFFF).toString(16).toUpperCase();
  return hex.padStart(4, '0');
}

export function createQrisDinamis(qrisStatis, qty) {
  const qtyString = String(qty);
  let qris = qrisStatis.substring(0, qrisStatis.length - 4);
  let step1 = qris.replace("010211", "010212");
  let step2 = step1.split("5802ID");
  let uang = "54" + String(qtyString.length).padStart(2, '0') + qtyString;
  uang += "5802ID";
  let fix = step2[0] + uang + step2[1];
  fix += ConvertCRC16(fix);
  return fix;
}