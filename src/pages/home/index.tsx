import { Col, Divider, Row, Card, Empty, Spin } from 'antd';
import styles from 'styles/client.module.scss';
import SearchClient from '@/components/client/search.client';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ICompany, IJob } from '@/types/backend';
import { callFetchCompany, callFetchJob } from '@/config/api';

const HomePage = () => {

    const [displayCompany, setDisplayCompany] = useState<ICompany[] | null>(null);
    const [displayJob, setDisplayJob] = useState<IJob[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initData = async () => {
            setIsLoading(true);
            const resCompany = await callFetchCompany("current=1&pageSize=4&sort=-updatedAt");
            if (resCompany.data) {
                setDisplayCompany(resCompany?.data?.result ?? []);
            }

            const resJob = await callFetchJob("current=1&pageSize=10&sort=-updatedAt");
            if (resJob.data) {
                setDisplayJob(resJob?.data?.result ?? []);
            }
            setIsLoading(false);
        }
        initData();
    }, [])

    return (
        <div className={`${styles["container"]} ${styles["home-section"]}`}>
            <div className="search-content" style={{ marginTop: 20 }}>
                <SearchClient />
            </div>
            <Divider />
            <div className={styles["company-content"]}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                            <span className={styles["title"]}>Nhà Tuyển Dụng Hàng Đầu</span>
                            <Link to="company">Xem tất cả</Link>
                        </div>
                    </Col>
                    {displayCompany?.map(item => {
                        return (
                            <Col span={24} md={6} key={item._id}>
                                <Card
                                    style={{ height: 350 }}
                                    hoverable
                                    cover={
                                        <div className={styles["card-customize"]} >
                                            <img
                                                alt="example"
                                                src={`${import.meta.env.VITE_BACKEND_URL}/images/company/${item?.logo}`}
                                            />
                                        </div>
                                    }
                                >
                                    <Divider />
                                    <h3 style={{ textAlign: "center" }}>{item.name}</h3>
                                </Card>
                            </Col>
                        )
                    })}

                    {(!displayCompany || displayCompany && displayCompany.length === 0)
                        &&
                        <div className={styles["empty"]}>
                            {isLoading ?
                                <Spin />
                                :
                                <Empty description="Không có dữ liệu" />
                            }
                        </div>
                    }
                </Row>
            </div>
            <Divider />
            <div className={styles["section-job"]}>
                <Row gutter={[20, 20]}>
                    <Col span={24}>
                        <div className={isMobile ? styles["dflex-mobile"] : styles["dflex-pc"]}>
                            <span className={styles["title"]}>Công Việc Mới Nhất</span>
                            <Link to="job">Xem tất cả</Link>
                        </div>
                    </Col>

                    {displayJob?.map(item => {
                        return (
                            <Col span={24} md={12} key={item._id}>
                                <Card size="small" title={item.name} hoverable>
                                    <div>

                                    </div>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                    <p>Card content</p>
                                </Card>
                            </Col>
                        )
                    })}


                    {(!displayJob || displayJob && displayJob.length === 0)
                        &&
                        <div className={styles["empty"]}>
                            {isLoading ?
                                <Spin />
                                :
                                <Empty description="Không có dữ liệu" />
                            }
                        </div>
                    }
                </Row>
            </div>
        </div>
    )
}

export default HomePage;