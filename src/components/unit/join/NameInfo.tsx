import React, {useEffect, useState} from "react";
import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";

type NameInfoProps = {
    userName: string;
    setUserName: (name: string) => void;
    onNext: () => void;
}

const NameInfo: React.FC<NameInfoProps> = ({userName, setUserName, onNext}) => {
    const [localName, setLocalName] = useState<string>(userName);
    const [isButtonActive, setIsButtonActive] = useState(false);

    useEffect(() => {
        setIsButtonActive(localName.trim() !== "");
    }, [localName]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setUserName(localName);
        };

        window.addEventListener("popstate", handleBeforeUnload);
        return () => {
            window.removeEventListener("popstate", handleBeforeUnload);
        };
    }, [localName]);

    const handleNext = () => {
        setUserName(localName);
        onNext();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(event.target.value);
    };

    return (
        <div className="flex flex-col justify-center gap-10 w-full">
            <div className="text-black font-bold text-xl mt-16">이름이 어떻게 되세요?</div>
            <InputField
                label={"이름을 입력해주세요"}
                dropdown={false}
                value={localName}
                onInput={handleChange}
            />

            {isButtonActive && (
                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "계속하기", position: "none"}}
                        onClick={handleNext}
                    />
                </div>
            )}
        </div>
    )
}

export default NameInfo;
