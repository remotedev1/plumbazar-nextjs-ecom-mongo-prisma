"use client";

import React, { useState, useEffect, useTransition } from 'react';
import Container from "@/components/ui/container";
import RfqClient from "./_components/Client";
import { useSession } from 'next-auth/react';
import axios from 'axios';

const RfqPage = () => {
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();
  const {data:{user}} = useSession();
  
  useEffect(() => {
    startTransition(async () => {
      const rfqData = await axios.get(`/api/rfq`);
      setData(rfqData.data);
    });
  }, [user]);


  return (
    <div className="bg-white min-h-[80vh] py-14">
      <Container>
       <RfqClient data={data} /> 
      </Container>
    </div>
  );
};

export default RfqPage;
