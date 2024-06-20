import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNewCouponMutation } from "../../../redux/api/couponAPI";
import { Rootstate } from "../../../redux/store";
import { MessageResponse } from "../../../types/apiTypes";

const Coupon = () => {
  const [CouponCode, setCouponCode] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [size, setSize] = useState<number>(30);
  const [coupon, setCoupon] = useState<string>("");

  const { user } = useSelector((state: Rootstate) => state.userReducer);

  const copyText = async (CouponCode: string) => {
    await window.navigator.clipboard.writeText(CouponCode);
    setIsCopied(true);
  };
  const [newCoupon] = useNewCouponMutation();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await newCoupon({ id: user?._id!, amount, code: CouponCode });
    if (res.data) {
      if (!(res.data.message === "Coupon already exists")) {
        setCoupon(CouponCode);
      }
      toast.success(res.data.message);
    } else {
      const error = res.error as FetchBaseQueryError;
      const message = (error.data as MessageResponse).message;
      toast.error(message);
    }
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Write Coupon Code"
              value={CouponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              minLength={5}
              maxLength={size}
            />

            {/* <input
              type="number"
              placeholder="Coupon Length"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min={8}
              max={25}
            /> */}

            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={10}
              max={5000}
            />

            <button type="submit">Generate</button>
          </form>

          {coupon && (
            <code>
              {coupon}{" "}
              <span onClick={() => copyText(coupon)}>
                {isCopied ? "Copied" : "Copy"}
              </span>{" "}
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
