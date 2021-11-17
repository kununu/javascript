const getGoogleTagManager = (googleTagManagerId: string): string => `// google tag manager
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${googleTagManagerId}');`;

const getGoogleTagManagerNoScript = (googleTagManagerId: string): string => `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManagerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;

export {getGoogleTagManager, getGoogleTagManagerNoScript};
