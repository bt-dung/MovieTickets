import React, { useEffect } from 'react';
import { usePayOS, PayOSConfig } from 'payos-checkout';

interface MakePaymentProps {
    payOSConfig: PayOSConfig;
}

const MakePayment: React.FC<MakePaymentProps> = ({ payOSConfig }) => {
    const { open, exit } = usePayOS(payOSConfig);

    useEffect(() => {
        open();
    }, [open]);

    const handleExit = () => {
        exit();
    };

    return (
        <div>
            <h1>Thanh toán vé</h1>
            <p>Vui lòng kiểm tra thông tin thanh toán của bạn trước khi tiếp tục.</p>

            {/* Thẻ này sẽ chứa giao diện thanh toán */}
            <div id="payos-container"></div>

            <button onClick={handleExit}>Đóng giao diện thanh toán</button>
        </div>
    );
};

export default MakePayment;
