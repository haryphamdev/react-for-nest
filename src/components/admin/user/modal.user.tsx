import { CheckSquareOutlined } from "@ant-design/icons";
import { FooterToolbar, ModalForm, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Col, Form, Row, message, notification } from "antd";
import { isMobile } from 'react-device-detect';
import { useEffect, useState } from "react";
import { callCreateCompany, callUpdateCompany } from "@/config/api";
import { IUser } from "@/types/backend";

interface IProps {
    openModal: boolean;
    setOpenModal: (v: boolean) => void;
    dataInit?: IUser | null;
    setDataInit: (v: any) => void;
    reloadTable: () => void;
}

interface ICompanyForm {
    name: string;
    address: string;
}

const ModalUser = (props: IProps) => {
    const { openModal, setOpenModal, reloadTable, dataInit, setDataInit } = props;

    const [form] = Form.useForm();

    useEffect(() => {

    }, [dataInit])

    const submitCompany = async (valuesForm: ICompanyForm) => {
        const { name, address } = valuesForm;

        // if (dataInit?._id) {
        //     //update
        //     const res = await callUpdateCompany(dataInit._id, name, address, value);
        //     if (res.data) {
        //         message.success("Cập nhật user thành công");
        //         handleReset();
        //         reloadTable();
        //     } else {
        //         notification.error({
        //             message: 'Có lỗi xảy ra',
        //             description: res.message
        //         });
        //     }
        // } else {
        //     //create
        //     const res = await callCreateCompany(name, address, value);
        //     if (res.data) {
        //         message.success("Thêm mới user thành công");
        //         handleReset();
        //         reloadTable();
        //     } else {
        //         notification.error({
        //             message: 'Có lỗi xảy ra',
        //             description: res.message
        //         });
        //     }
        // }
    }

    const handleReset = async () => {
        form.resetFields();
        setDataInit(null);
        setOpenModal(false);
    }

    return (
        <>
            <ModalForm
                title={<>{dataInit?._id ? "Cập nhật User" : "Tạo mới User"}</>}
                open={openModal}
                modalProps={{
                    onCancel: () => { handleReset() },
                    afterClose: () => handleReset(),
                    destroyOnClose: true,
                    width: isMobile ? "100%" : 900,
                    keyboard: false,
                    maskClosable: false,
                    okText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
                    cancelText: "Hủy"
                }}
                scrollToFirstError={true}
                preserve={false}
                form={form}
                onFinish={submitCompany}
                initialValues={dataInit?._id ? dataInit : {}}

            // submitter={{
            //     render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
            //     submitButtonProps: {
            //         icon: <CheckSquareOutlined />
            //     },
            //     searchConfig: {
            //         resetText: "Hủy",
            //         submitText: <>{dataInit?._id ? "Cập nhật" : "Tạo mới"}</>,
            //     }
            // }}
            >
                <Row gutter={16}>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Email"
                            name="email"

                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập email"
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText.Password
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập password"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormText
                            label="Tên hiển thị"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập tên hiển thị"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormDigit
                            label="Tuổi"
                            name="age"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập nhập tuổi"
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="gender"
                            label="Giới Tính"
                            valueEnum={{
                                male: 'Nam',
                                female: 'Nữ',
                                other: 'Khác',
                            }}
                            placeholder="Please select a gender"
                            rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                        />
                    </Col>
                    <Col lg={6} md={6} sm={24} xs={24}>
                        <ProFormSelect
                            name="role"
                            label="Vai trò"
                            valueEnum={{
                                ADMIN: 'ADMIN',
                                HR: 'HR',
                                USER: 'USER',
                            }}
                            placeholder="Please select a role"
                            rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                        />
                    </Col>

                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormSelect
                            name="company"
                            label="Thuộc Công Ty"
                            valueEnum={{
                                ADMIN: 'ADMIN',
                                HR: 'HR',
                                USER: 'USER',
                            }}
                            placeholder="Please select a company"
                            rules={[{ required: true, message: 'Vui lòng chọn company!' }]}
                        />
                    </Col>
                    <Col lg={12} md={12} sm={24} xs={24}>
                        <ProFormText
                            label="Địa chỉ"
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                            placeholder="Nhập địa chỉ"
                        />
                    </Col>
                </Row>
            </ModalForm>
        </>
    )
}

export default ModalUser;
