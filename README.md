# Aroi · React Workshop

โปรเจกต์เริ่มต้นของ Workshop "สร้างแอป React จริงทีละขั้น" ของ Varis Lab
เราจะสร้าง **Aroi** แอปค้นหาสูตรอาหาร ด้วย React, TypeScript, React Router
และข้อมูลจริงจาก [DummyJSON](https://dummyjson.com/docs/recipes)

## เริ่มต้น

1. กดปุ่ม **Use this template → Create a new repository** ด้านบนของหน้านี้
   เพื่อสร้าง repo ของตัวเอง
2. Clone repo ของตัวเองลงเครื่อง แล้วรันคำสั่ง:

```bash
npm install
npm run dev
```

3. เปิด `http://localhost:5173` ต้องเห็นหน้า "Aroi is ready"

ต้องใช้ Node.js 22.22 ขึ้นไป (ตรวจด้วย `node -v`)

## คำสั่งที่ใช้บ่อย

| คำสั่ง             | ทำอะไร                               |
| ---------------- | ------------------------------------ |
| `npm run dev`    | เปิด dev server                       |
| `npm run build`  | ตรวจ type แล้ว build ไฟล์สำหรับขึ้นเว็บจริง |
| `npm run lint`   | ตรวจโค้ดด้วย Oxlint                    |
| `npm run format` | จัดรูปแบบโค้ดด้วย Prettier               |

## โค้ดของแต่ละบท

`main` คือโปรเจกต์เริ่มต้น ส่วนโค้ดที่เสร็จแล้วของแต่ละบทอยู่ใน branch ตามเลขบท
ถ้าทำตามแล้วติด ให้เปิด branch ของบทนั้นมาเทียบ

| Branch                 | สิ่งที่เพิ่มเข้ามา                                           |
| ---------------------- | ----------------------------------------------------- |
| `01-start`             | โปรเจกต์เริ่มต้น (เหมือน `main`)                           |
| `02-api-and-types`     | `src/api.ts` และ `src/types.ts`                       |
| `03-routes-and-layout` | React Router, Layout, หน้า Home และหน้า 404             |
| `04-recipe-list`       | หน้ารายการสูตรอาหาร โหลดข้อมูลด้วย `useEffect` และ `fetch` |
| `05-recipe-detail`     | หน้ารายละเอียดสูตรอาหาร `/recipes/:id`                   |
| `06-search-and-filter` | ค้นหาและกรองด้วย tag ผ่าน `useSearchParams`              |
| `07-custom-hook`       | `useFetch` และ `AbortController`                      |
| `08-favorites`         | รายการโปรดด้วย Context และ `localStorage`              |
| `09-vitest`            | ทดสอบด้วย Vitest และ React Testing Library             |
| `10-deploy`            | `vercel.json` สำหรับ deploy ขึ้น Vercel (แอปฉบับสมบูรณ์)    |
| `bonus-pagination`     | แบ่งหน้าด้วย `limit` และ `skip`                          |
