import { useDeletePendingTrades } from "@/hooks/useDeletePendingTrades";
import useAuth  from "@/hooks/useAuth";
import { useRouter } from "next/router";
import s from "./CloseTrade.module.css";

export default function CloseTrade (){
  const { user } = useAuth();
  const navigate = useRouter();
  const { isPending, error, success, deletePendingTrades } = useDeletePendingTrades(user.email);

  const handleDeleteTrades = () => {
    deletePendingTrades();
  };

  const handleNavigate = () => {
    navigate.push("/dashboard/home");
  }

  return (
    <div className={s.ctn}>
          <h1>Please Note!</h1>
          <p>All pending trades will be terminated.</p>
          {error && <p className='formError'>{error}</p>}
          <div>
          {success && <button style={{...overwrite}} className='bigBtn full'>Done</button>}
          {isPending && <button style={{...overwrite}} className='bigBtn full'>Deleting...</button>}
          {!isPending && !success && <button style={{...overwrite, background: "#ff202012", border: "1px solid #ff0000"}} className='bigBtn full' onClick={handleDeleteTrades}>Continue Closing Trades <span style={{...span1}}>&rarr;</span></button>}
          <button style={{...overwrite}} className='bigBtn full' onClick={handleNavigate}><span style={{...span2}}>&larr;</span> Back To Dashboard </button>
          </div>
    </div>
  );
};



const span2 = {
  fontSize: "1.5em",
  paddingRight: "1em",
}


const span1 = {
  fontSize: "1.5em",
  paddingLeft: "1em",
}

const overwrite = {
  background: "none",
  border: "1px solid #000000",
}
