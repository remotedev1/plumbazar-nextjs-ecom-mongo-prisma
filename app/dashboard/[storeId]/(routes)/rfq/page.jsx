"use client";

import React, { useState, useEffect, useTransition } from "react";
import Container from "@/components/ui/container";
import { useSession } from "next-auth/react";
import axios from "axios";
import RfqClient from "./components/Client";

const RfqPage = () => {
  const [data, setData] = useState(null);
  const [isPending, startTransition] = useTransition();
  const {
    data: { user },
  } = useSession();

  useEffect(() => {
    startTransition(async () => {
      const rfqData = await axios.get(`/api/rfq/admin`);
      setData(rfqData.data);
    });
  }, [user]);

  return (
    <div className="bg-white min-h-[80vh] py-14">
      <Container>
        <RfqClient data={data} isPending={isPending}/>
      </Container>
    </div>
  );
};

export default RfqPage;
