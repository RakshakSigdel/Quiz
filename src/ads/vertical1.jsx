import React, { useEffect } from 'react';

const AdBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error('AdSense error:', e);
        }
    }, []);

    return (
        <div>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3516806349504803"
                data-ad-slot="4743815977"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>

        </div>
    );
};

export default AdBanner;
