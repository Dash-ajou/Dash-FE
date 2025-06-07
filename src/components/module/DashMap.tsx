import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

const containerStyle = {
    width: "100%",
    height: "200px", // 작게 보일 때 높이
}

const center = {
    lat: 37.282, // 예시 위도 (아주대)
    lng: 127.047, // 예시 경도 (아주대)
}

const DashMap = ({ isLarge = false }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "여기에_본인_API_KEY", // ★본인 키로 교체!
    })

    if (!isLoaded) return <div>지도를 불러오는 중...</div>

    return (
        <GoogleMap
            mapContainerStyle={{
                ...containerStyle,
                height: isLarge ? "400px" : "200px", // 크게 띄울 땐 높이 늘리기
            }}
            center={center}
            zoom={15}
        >
            <Marker position={center} />
        </GoogleMap>
    )
}

export default DashMap
