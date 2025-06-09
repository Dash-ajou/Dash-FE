import React from "react"
import Icon from "../common/icons/Icon.tsx"

const Description: React.FC = () => {
    return (
        <div
            id="description"
            className="flex flex-col items-center justify-center min-h-screen px-10"
        >
            {/* 상단 로고 & 타이틀 */}
            <div className="flex items-center gap-2 mb-8">
                <Icon name="logoicon" size={32} />
                <span className="text-3xl font-bold text-blue-600 tracking-tight">D:ASH</span>
                <span className="ml-2 px-2 py-1 bg-blue-50 rounded text-blue-600 text-sm font-medium">
                    시연페이지
                </span>
            </div>

            {/* QR 코드 자리 */}
            <div className="w-60 h-60 border-[3px] border-blue-400 rounded-3xl mb-6 flex items-center justify-center p-2">
                <img src="/qrimg.png" alt="QR Code" />
            </div>

            {/* Power by */}
            <div className="flex items-center mb-6">
                <span className="text-xs font-bold text-blue-500 mr-5">Power by</span>
                <Icon name="logoicon" size={16} />
                <span className="ml-1 text-xs font-semibold text-blue-600">D:ASH</span>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-3 mb-8">
                <button className="flex flex-row px-4 py-3 border border-blue-500 rounded text-blue-600 font-semibold hover:bg-blue-50 text-sm gap-2">
                    <Icon name={"smartphone_line"} />
                    직접 사용해보기
                </button>
                <button
                    className="flex flex-row px-4 py-3 border border-gray-300 rounded text-gray-400 font-semibold bg-gray-100 text-sm gap-2 hover:bg-blue-50"
                    onClick={() => window.open("https://github.com/Dash-ajou", "_blank")}
                >
                    <Icon name={"git_line"} />
                    프로젝트 Github
                </button>
            </div>
        </div>
    )
}

export default Description
