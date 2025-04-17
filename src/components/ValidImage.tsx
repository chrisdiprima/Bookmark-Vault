import React, { useState, useEffect } from "react";

interface ValidImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
	fallback?: React.ReactNode;
}

const ValidImage: React.FC<ValidImageProps> = ({
	src,
	alt,
	fallback = null,
	...props
}) => {
	const [isValid, setIsValid] = useState(true);

	useEffect(() => {
		if (!src) {
			setIsValid(false);
			return;
		}

		const img = new Image();
		img.src = src;

		img.onload = () => {
			if (img.naturalWidth === 16 || img.naturalHeight === 16) {
				setIsValid(false);
			}
		};

		img.onerror = () => {
			setIsValid(false);
		};
	}, [src]);

	if (!src || !isValid) {
		return <>{fallback}</>;
	}

	return <img src={src} alt={alt} {...props} />;
};

export default ValidImage;
