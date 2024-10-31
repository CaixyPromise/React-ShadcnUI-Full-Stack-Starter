'use client'

import React, { useState, useCallback, useEffect, useRef, useImperativeHandle } from 'react'
import Image from 'next/image'
import { Captcha } from './captcha-root'
import { CaptchaProps, CaptchaRef } from "@/components/Captcha/typing"
import useDebounce from "@/hooks/useDebounce"
import Spinner from "@/components/Spinner"

export interface ImageCaptchaProps extends CaptchaProps {
    fetchImage: () => Promise<API.CaptchaVO>;
}

const ImageCaptcha = React.forwardRef<CaptchaRef, ImageCaptchaProps>(
({
     inputProps,
     fetchImage, inputClassName,
     carrierClassName,
     ...props
 }, ref) => {
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null)
    const [captchaId, setCaptchaId] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const fetchImageRef = useRef(fetchImage)

    const fetchAndSetImage = useCallback(async () => {
        setIsLoading(true)
        try {
            const { codeImage, uuid } = await fetchImageRef.current()
            setCaptchaId(uuid as string)
            setCurrentImageUrl(`data:image/png;base64,${codeImage || ""}`)
        }
        catch (error) {
            console.error('获取验证码图片失败:', error)
        }
        finally {
            setIsLoading(false)
        }
    }, [])

    const [debouncedFetchImage] = useDebounce(fetchAndSetImage, 300)

    const handleRefresh = useCallback(() => {
        debouncedFetchImage()
    }, [debouncedFetchImage])

    useEffect(() => {
        fetchAndSetImage()
    }, [fetchAndSetImage])

    return (
        <Captcha {...props} inputProps={inputProps} ref={ref} refreshCaptcha={fetchAndSetImage} captchaId={captchaId} inputClassName={inputClassName} carrierClassName={carrierClassName}>
            <Spinner loading={isLoading || currentImageUrl === null}>
                {currentImageUrl ? (
                    <Image
                        src={currentImageUrl}
                        alt="Captcha"
                        width={130}
                        height={100}
                        className="rounded-md cursor-pointer w-full h-auto"
                        onClick={handleRefresh}
                    />
                ) : (<></>)}
            </Spinner>
        </Captcha>
    )
})

ImageCaptcha.displayName = 'Captcha.Image'

export {ImageCaptcha}
