import React from 'react';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { fetchSingleComplaint } from '../api/ApiCollection';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const Complaint = () => {
    const tempEntries: number[] = [1, 2, 3, 4, 5];
    const dataLine = [
        {
            name: 'Jan',
            resolved: 4000,
            unresolved: 2400,
            amt: 2400,
        },
        {
            name: 'Feb',
            resolved: 3000,
            unresolved: 1398,
            amt: 2210,
        },
        {
            name: 'Mar',
            resolved: 2000,
            unresolved: 9800,
            amt: 2290,
        },
        {
            name: 'Apr',
            resolved: 2780,
            unresolved: 3908,
            amt: 2000,
        },
        {
            name: 'May',
            resolved: 1890,
            unresolved: 4800,
            amt: 2181,
        },
        {
            name: 'Jun',
            resolved: 2390,
            unresolved: 3800,
            amt: 2500,
        },
        {
            name: 'Jul',
            resolved: 3490,
            unresolved: 4300,
            amt: 2100,
        },
    ];

    const { id } = useParams();

    const { isLoading, isError, data, isSuccess } = useQuery({
        queryKey: ['complaint', id],
        queryFn: () => fetchSingleComplaint(id || ''),
    });

    React.useEffect(() => {
        if (isLoading) {
            toast.loading('Loading...', { id: 'promiseRead' });
        }
        if (isError) {
            toast.error('Error while getting the data!', {
                id: 'promiseRead',
            });
        }
        if (isSuccess) {
            toast.success('Read the data successfully!', {
                id: 'promiseRead',
            });
        }
    }, [isError, isLoading, isSuccess]);

    return (
        <div id="singleComplaint" className="w-full p-0 m-0">
            <div className="w-full grid xl:grid-cols-2 gap-10 mt-5 xl:mt-0">
                <div className="w-full flex flex-col items-start gap-10">
                    <div className="w-full flex flex-col items-start gap-5">
                        <div className="w-full flex items-center gap-3">
                            <div className="flex items-center gap-3 xl:gap-8 xl:mb-4">
                                <div className="">
                                    {isLoading ? (
                                        <div className="w-24 xl:w-36 h-24 xl:h-36 skeleton dark:bg-neutral"></div>
                                    ) : isSuccess ? (
                                        <div className="w-24 xl:w-36">
                                            <img
                                                src={data.img} // Ensure your API provides an image or replace with a placeholder
                                                alt="Complaint image"
                                                className="w-full h-auto object-cover"
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="flex flex-col items-start gap-1">
                                    {isLoading ? (
                                        <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                                    ) : isSuccess ? (
                                        <h3 className="font-semibold text-xl xl:text-3xl dark:text-white">
                                            {data.title}
                                        </h3>
                                    ) : (
                                        <div className="w-[200px] h-[36px] skeleton dark:bg-neutral"></div>
                                    )}
                                    <span className="font-normal text-base">
                    Complaint ID
                  </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex gap-8">
                            {isLoading ? (
                                <div className="w-full xl:w-[50%] h-52 skeleton dark:bg-neutral"></div>
                            ) : isSuccess ? (
                                <div className="w-full grid grid-cols-3 xl:flex gap-5 xl:gap-8">
                                    <div className="col-span-1 flex flex-col items-start gap-3 xl:gap-5">
                                        <span>Complaint ID</span>
                                        <span>Status</span>
                                        <span>Details</span>
                                        <span>Created At</span>
                                    </div>
                                    <div className="col-span-2 flex flex-col items-start gap-3 xl:gap-5">
                                        <span className="font-semibold">{data.id}</span>
                                        <span className="font-semibold">
                      {data.status}
                    </span>
                                        <span className="font-semibold">
                      {data.details}
                    </span>
                                        <span className="font-semibold">
                      {new Date(data.createdAt).toLocaleDateString()}
                    </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full xl:w-[50%] h-52 skeleton dark:bg-neutral"></div>
                            )}
                        </div>
                    </div>
                    <div className="w-full h-[2px] bg-base-300 dark:bg-slate-700"></div>
                    {isLoading ? (
                        <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
                    ) : isSuccess ? (
                        <div className="w-full min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={dataLine}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="resolved"
                                        stroke="#8884d8"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="unresolved"
                                        stroke="#82ca9d"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="w-full min-h-[300px] skeleton dark:bg-neutral"></div>
                    )}
                </div>
                <div id="activities" className="w-full flex flex-col items-start gap-5">
                    <h2 className="text-2xl font-semibold dark:text-white">
                        Latest Activities
                    </h2>
                    {isLoading &&
                        tempEntries.map((index: number) => (
                            <div
                                className="w-full h-20 skeleton dark:bg-neutral"
                                key={index}
                            ></div>
                        ))}
                    {isSuccess && (
                        <ul>
                            <li>
                                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                                    <span>John Doe resolved this complaint</span>
                                    <span className="text-xs">3 days ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                                    <span>Jane Smith updated this complaint</span>
                                    <span className="text-xs">1 week ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                                    <span>Admin assigned this complaint to support</span>
                                    <span className="text-xs">2 weeks ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                                    <span>Support responded to the complaint</span>
                                    <span className="text-xs">3 weeks ago</span>
                                </div>
                            </li>
                            <li>
                                <div className="ml-[1px] relative p-4 bg-base-200 dark:bg-neutral dark:text-neutral-50 min-w-[85vw] xl:min-w-[480px] flex flex-col items-start gap-3">
                                    <span>Complaint closed by Admin</span>
                                    <span className="text-xs">1 month ago</span>
                                </div>
                            </li>
                        </ul>
                    )}
                    {isError &&
                        tempEntries.map((index: number) => (
                            <div
                                className="w-full h-20 skeleton dark:bg-neutral"
                                key={index}
                            ></div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Complaint;
