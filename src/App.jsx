import  { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function App() {
    const [scanResult, setScanResult] = useState(null);
    const [manualSerialNumber, setManualSerialNumber] = useState('');

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });

        let isScanning = true;

        scanner.render(success, error);

        function success(result) {
            if (isScanning) {
                scanner.clear();
                setScanResult(result);
                isScanning = false;
            }
        }

        function error(err) {
            console.warn(err);
        }
    }, []);

    function handleManualSerialNumberChange(event) {
        setManualSerialNumber(event.target.value);
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">QR Kod Okuyucu</h1>
            {scanResult ? (
                <div className="bg-green-100 p-4 rounded-lg text-center">
                    <p className="text-green-500 text-lg">
                        Başarılı:{" "}
                        <a href={scanResult} className="text-blue-500 hover:underline">
                            {scanResult}
                        </a>
                    </p>
                    <p className="mt-2">Seri Numarası: {scanResult.slice(-16)}</p>
                </div>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow-lg">
                    <div id="reader" className="mt-4"></div>
                    <p className="mt-4 text-lg">Manuel olarak girin:</p>
                    <div className="flex items-center mt-2">
                        <input
                            type="text"
                            className="border rounded p-2"
                            value={manualSerialNumber}
                            onChange={handleManualSerialNumberChange}
                        />
                        {manualSerialNumber && (
                            <p className="ml-2">Seri Numarası: {manualSerialNumber.slice(-16)}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
