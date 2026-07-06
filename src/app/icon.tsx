    import { ImageResponse } from 'next/og'

    export const size = { width: 32, height: 32 }
    export const contentType = 'image/png'

    export default function Icon() {
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
            {/* J for Journal */}
            <div
            style={{
                fontFamily: 'sans-serif',
                fontWeight: 900,
                fontSize: 20,
                color: '#C8FF00',
                letterSpacing: '-1px',
            }}
            >
            J
            </div>
        </div>
        ),
        { ...size }
    )
    }