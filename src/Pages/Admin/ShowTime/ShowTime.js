import React, { useEffect, useState } from 'react'
import { Button, Form } from 'antd';
import { Select } from 'antd';
import { DatePicker, Space } from 'antd';
import { InputNumber } from 'antd';
import { quanLyRapService } from '../../../Services/QuanLyRapService';
import { useFormik } from 'formik';
import moment from 'moment';
import { quanLyDatVeService } from '../../../Services/QuanLyDatVeService';
export default function ShowTime(props) {
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: []
    })

    const formik = useFormik({
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: 0
        },
        onSubmit: async (values) => {
            console.log((values))
            try {
                let result = await quanLyDatVeService.taoLichChieu(values)
                alert(result.data.content)
            } catch (error) {
                console.log(error.reponse?.data)
           
            }
        }
    })
    useEffect(async () => {
        try {
            let result = await quanLyRapService.layDanhSachHeThongRap();
            setState({
                ...state, heThongRapChieu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    const handleChangeHeThongRap = async (value) => {
        try {
            let result = await quanLyRapService.layThongTinCumRapTheoHeThong(value);
            setState({
                ...state,
                cumRapChieu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
    console.log(state.cumRapChieu.danhSachRap)
    const handleChangeCumRap = (value) => {
       
        formik.setFieldValue('maRap',value)
    }
    const onOK = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
     
    }

    const handleChangeDateTime = (values) => {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
    }
    

    const handleChangeInputNumber = (values) => {
        formik.setFieldValue('giaVe',values)
    };
    const optionHeThongRap = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    };
    const optionHeThongCumRap = () => {
        return state.cumRapChieu?.map((cr, index) => {
            return { label: cr.tenCumRap, value: cr.maCumRap }
        })
    };
    return (
        <div className="container">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={{
                    remember: true,
                }}
                onSubmitCapture={formik.handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-5">T???o l???ch chi???u - {props.match.params.tenPhim}</h1>
                <Form.Item
                    label="H??? th???ng r???p"

                >
                    <Select options={optionHeThongRap()} onChange={handleChangeHeThongRap} placeholder="Ch???n h??? th???ng r???p" />,
                </Form.Item>

                <Form.Item
                    label="C???m r???p"

                >
                    <Select options={optionHeThongCumRap()} onChange={handleChangeCumRap} placeholder="Ch???n c???m r???p" />,
                </Form.Item>
                <Form.Item
                    label="Ng??y gi??? chi???u"

                >
                    <DatePicker format="DD/MM/YYYY hh:mm:ss" showTime onChange={handleChangeDateTime} onOk={onOK} />

                </Form.Item>
                <Form.Item
                    label="Gi?? v??"

                >
                    <InputNumber onChange={handleChangeInputNumber} min={75000} max={150000} defaultValue={75000} />

                </Form.Item>
                <Form.Item
                    label="T??c v???"

                >
                    <Button type="primary" htmlType="submit">T???o l???ch chi???u</Button>



                </Form.Item>


            </Form>
        </div>
    )
}
