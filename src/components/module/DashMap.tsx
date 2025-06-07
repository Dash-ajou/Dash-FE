import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
    width: "100%",
    height: "200px", // 작게 보일 때 높이
}

const center = {
    lat: 37.282, // 예시 위도 (아주대)
    lng: 127.047, // 예시 경도 (아주대)
}
const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY

const DashMap = ({ isLarge = false }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAP_KEY,
    })

    if (!isLoaded) return <div>지도를 불러오는 중...</div>

    return (
        <GoogleMap
            mapContainerStyle={{
                ...containerStyle,
                height: isLarge ? "400px" : "200px",
            }}
            center={center}
            zoom={15}
            options={{
                disableDefaultUI: true,
                // 필요하다면 특정 컨트롤만 켜거나 끌 수도 있음
                // zoomControl: false,
                // mapTypeControl: false,
            }}
        >
            <Marker position={center} />
        </GoogleMap>
    )
}

export default DashMap
