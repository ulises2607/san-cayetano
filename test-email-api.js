// Script de prueba para la API de envío de emails
const http = require('http');
const https = require('https');
const { URLSearchParams } = require('url');

const API_URL = 'http://localhost:3000/api/send-email';

async function testEmailAPI() {
  console.log('🧪 Iniciando test de la API de emails...');
  console.log('='.repeat(50));

  // Datos de prueba que coinciden exactamente con los nombres del formulario
  const testData = {
    'fullname': 'Juan Pérez Teste',
    'bornDate': '1990-05-15',
    'D.N.I.': '12345678',
    'Domicilio': 'Av. San Martín 123, Salta',
    'Telefono': '3874567890',
    'Email': 'juan.perez.test@example.com',
    'Profesion': 'Técnico en Laboratorio',
    'Estudiante': 'No',
    'Tipo de Asistente': 'Asistente'
  };

  // Mostrar los datos que enviaremos
  Object.entries(testData).forEach(([key, value]) => {
    console.log(`✅ Campo: "${key}" = "${value}"`);
  });

  console.log('='.repeat(50));
  console.log('📤 Enviando request a:', API_URL);

  // Crear boundary para multipart/form-data
  const boundary = '----formdata-boundary-' + Math.random().toString(16);
  
  // Construir el body multipart/form-data
  let body = '';
  Object.entries(testData).forEach(([key, value]) => {
    body += `--${boundary}\r\n`;
    body += `Content-Disposition: form-data; name="${key}"\r\n\r\n`;
    body += `${value}\r\n`;
  });
  body += `--${boundary}--\r\n`;

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/send-email',
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': Buffer.byteLength(body)
    }
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      console.log('📥 Response Status:', res.statusCode);
      console.log('📥 Response Headers:', res.headers);

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log('📥 Response Body:', responseData);

        let jsonResponse;
        try {
          jsonResponse = JSON.parse(responseData);
          console.log('📊 Parsed JSON:', JSON.stringify(jsonResponse, null, 2));
        } catch (parseError) {
          console.log('❌ Error parsing JSON response:', parseError.message);
        }

        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log('✅ SUCCESS: Email API responded successfully');
        } else {
          console.log('❌ ERROR: API returned error status');
        }

        resolve(responseData);
      });
    });

    req.on('error', (error) => {
      console.log('💥 NETWORK ERROR:', error.message);
      console.log('🔍 Make sure your Next.js server is running on http://localhost:3000');
      reject(error);
    });

    req.write(body);
    req.end();
  });
}

// Ejecutar el test
testEmailAPI()
  .then(() => {
    console.log('='.repeat(50));
    console.log('🏁 Test completed');
  })
  .catch((error) => {
    console.log('='.repeat(50));
    console.log('💥 Test failed:', error.message);
  });
