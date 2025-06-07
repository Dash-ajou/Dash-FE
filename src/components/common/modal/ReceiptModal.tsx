const ReceiptModal = () => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        <div className="bg-white rounded-lg shadow-[0_0_10px_0_rgba(0,0,0,0.5)] justify-center items-center px-[50px] pt-[73px] pb-3">
            <div className="flex justify-center mb-5">
                <p className="text-2xl text-black font-bold">매장이름</p>
            </div>
            <div className="flex flex-col justify-start items-start">
                <p className="text-xs text-black font-medium">(주소)</p>
                <p className="text-xs text-black font-medium mb-5">(대표명)</p>
                <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
            </div>
            <div className="flex gap-[72px] py-5">
                <div>
                    <p className="text-sm text-black font-semibold">발행 단체명</p>
                    <p className="text-sm text-black font-semibold">대표자명</p>
                    <p className="text-sm text-black font-semibold">대표자 연락처</p>
                    <p className="text-sm text-black font-semibold">요청 상세</p>
                    <p className="text-sm text-black font-semibold">사용 일시</p>
                </div>
                <div>
                    <p className="text-sm text-black font-light">(단체명)</p>
                    <p className="text-sm text-black font-light">(이름)</p>
                    <p className="text-sm text-black font-light">(전화번호)</p>
                    <p className="text-sm text-black font-light">(메뉴명)</p>
                    <p className="text-sm text-black font-light">(일시)</p>
                </div>
            </div>
            <div className="self-stretch h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
            <div className="mt-6 mb-8 w-60 h-60 border bg-black" />
        </div>
        </div>
    );
};

export default ReceiptModal;