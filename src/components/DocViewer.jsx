import { useEffect, useRef, useState } from 'react';
import { faPlusCircle, faCircleArrowLeft, faCircleArrowRight, faDownload, faHamburger, faPrint, faQrcode, faRefresh, faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function DocViewer(props) {
	const containerRef = useRef(null);
    const [selectedDocs, setSelectedDocs] = useState([]);
    
	useEffect(() => {
		const container = containerRef.current;
		let instance, PSPDFKit;
		(async function () {
            if (selectedDocs.length === 0) {
                return;
            }
			PSPDFKit = await import('pspdfkit');
			PSPDFKit.unload(container);
            const documentBlobObjectUrl = window.URL.createObjectURL(selectedDocs[0]);
			instance = await PSPDFKit.load({
				// Container where PSPDFKit should be mounted.
				container,
				// The document to open.
				document:  documentBlobObjectUrl,
				// Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
				baseUrl: `${window.location.protocol}//${window.location.host}/`,
			})	.then(instance => {
                // Make sure to revoke the object URL so the browser doesn't hold on to the blob object that's not needed any more.
                URL.revokeObjectURL(documentBlobObjectUrl);
            });;
		})();

		return () => PSPDFKit && PSPDFKit.unload(container);
	}, [selectedDocs]);

	return (
        <>
        <nav className="nav">
            <li><FontAwesomeIcon icon={faHamburger} /></li>
            <li><FontAwesomeIcon icon={faCircleArrowLeft} /></li>
            <li><FontAwesomeIcon icon={faSearchPlus} /></li>
            <li><FontAwesomeIcon icon={faSearchMinus} /></li>
            <li><FontAwesomeIcon icon={faCircleArrowRight} /></li>
            <li><FontAwesomeIcon icon={faPrint} /></li>
            <li><FontAwesomeIcon icon={faDownload} /></li>
            <li><FontAwesomeIcon icon={faQrcode} /></li>
            <li><label htmlFor='file-input'><FontAwesomeIcon icon={faPlusCircle} /></label>
            <input
                id='file-input'
            style={{display: "none"}}
        type="file"
        multiple
        onChange={(el) =>
        el.target.files?.length &&
        setSelectedDocs(Array.from(el.target.files))
        }
    />
            </li>

        </nav>
    
		<div

			ref={containerRef}
			style={{ width: '100%', height: '95vh' }}
		/>
        </>
	);
}