    import { ImageResponse } from 'next/og'

    export const size = { width: 180, height: 180 }
    export const contentType = 'image/png'

    export default function AppleIcon() {
    return new ImageResponse(
        (
        <div
            style={{
            width: '100%',
            height: '100%',
            background: '#030305',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <div
            style={{
                fontFamily: 'sans-serif',
                fontWeight: 900,
                fontSize: 110,
                color: '#C8FF00',
                letterSpacing: '-4px',
            }}
            >
            J
            </div>
        </div>
        ),
        { ...size }
    )
    }