import Image, { ImageProps } from "next/image";

export function Screenshot(props: ImageProps) {
    return (
        <div className="w-full mx-auto bg-surface-2 p-2 md:p-4 rounded-sm sm:rounded-md flex justify-center items-center">
            <Image
                width={1900}
                height={900}
                className={`w-full h-auto outline-offset-1 outline-1 md:outline-1 hover:outline-border-hover outline-border-soft rounded-sm sm:rounded-md transition-all duration-300 ease-in-out animate-slide-in-bottom`}
                loading="eager"
                {...props}
            />
        </div>
    );
}
