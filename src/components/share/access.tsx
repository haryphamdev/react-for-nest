import { useEffect, useRef, useState } from 'react';
import { Result } from "antd";

interface IProps {
    hideChildren?: boolean;
    children: React.ReactNode;
    permission: { method: string, path: string };
}

function getPathFromUrl(url: string) {
    return url.split(/[?#]/)[0];
}

export const API_LIST = {
    APP_DETAIL: {
        // method: API_URLS..g.method,
        // path: getPathFromUrl()
    },
}


const Access = (props: IProps) => {
    //set default: hideChildren = false => vẫn render children
    // hideChildren = true => ko render children, ví dụ hide button (button này check quyền)
    const { permission, hideChildren = false } = props;
    const [allow, setAllow] = useState<boolean>(false);

    //add ref: => only setAllow once
    const isCheckRef = useRef(true)




    useEffect(() => {
        // if (auth && auth.apis && userInfo && !userInfo.isSuperAdmin && isCheckRef.current) {
        //     const apis = auth.apis;
        //     if (apis && apis.length > 0) {
        //         let x = false;
        //         const check = apis.find(item => {
        //             // return item.method === permission?.method && permission?.path?.startsWith(item.path)
        //             return item.method === permission?.method && permission.path === item.path

        //         })
        //         if (check) x = true;

        //         setAllow(x);
        //         isCheckRef.current = false;
        //     }
        // }

        // if (userInfo?.isSuperAdmin && isCheckRef.current) {
        //     setAllow(true)
        //     isCheckRef.current = false;
        // }
    }, [])

    return (
        <>
            {allow === true ?
                <>{props.children}</>
                :
                <>
                    {hideChildren === false ?
                        <Result
                            status="403"
                            title="Truy cập bị từ chối"
                            subTitle="Xin lỗi, bạn không có quyền hạn (permission) truy cập thông tin này"
                        />
                        :
                        <>
                            {/* render nothing */}
                        </>
                    }
                </>
            }
        </>

    )
}

export default Access;