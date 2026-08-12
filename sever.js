require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// المجلد الذي يحتوي على الملفات (يدعم الاسم puplic الظاهر في صورتك)
const publicPath = path.join(__dirname, 'puplic');
app.use(express.static(publicPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// مسار استقبال البيانات الآمن
app.post('/api/submit', async (req, res) => {
    try {
        const sheetMonkeyUrl = process.env.SHEETMONKEY_URL;
        
        if (!sheetMonkeyUrl) {
            return res.status(500).json({ success: false, message: 'رابط الإرسال غير متوفر في متغيرات البيئة.' });
        }

        const response = await fetch(sheetMonkeyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        if (response.ok) {
            return res.status(200).send(`
                <!DOCTYPE html>
                <html lang="ar" dir="rtl">
                <head>
                    <meta charset="UTF-8">
                    <title>تم الإرسال بنجاح</title>
                    <style>
                        body { font-family: sans-serif; background: #0b1b54; color: #fff; text-align: center; padding: 50px; }
                        .card { background: rgba(255,255,255,0.1); padding: 40px; border-radius: 16px; display: inline-block; }
                        a { color: #00bcd4; text-decoration: none; font-weight: bold; margin-top: 20px; display: inline-block; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>✅ تم إرسال استمارتك بنجاح!</h1>
                        <p>شكراً لترشحك في السباق القيادي لـ CLUB TOMOUH.</p>
                        <a href="/">العودة إلى الصفحة الرئيسية</a>
                    </div>
                </body>
                </html>
            `);
        } else {
            return res.status(500).send('<h1>حدث خطأ أثناء إرسال البيانات. يرجى المحاولة لاحقاً.</h1>');
        }
    } catch (error) {
        console.error('Submission Error:', error);
        return res.status(500).send('<h1>حدث خطأ في السيرفر.</h1>');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});