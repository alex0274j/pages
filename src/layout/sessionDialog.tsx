import React, { useEffect, useState, useRef } from "react";
import { useSelector, connect, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  refreshToken,
  setLastAccess,
  setSessionExpired
} from "../features/user/userSlice";
import DefaultDialog from "../shared/defaultDialog";
import { store, RootState } from "../store";
import { apiPOST } from "../shared/apiFetch";

const SessionDialog = (): JSX.Element | null => {
  const [dialog, setDialog] = useState<string | undefined>(undefined);
  const [ack, setAck] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const timer = useRef<NodeJS.Timer>();
  const interval = useRef(10000);

  const lastAccess = useSelector((state: RootState) => state.user.lastAccess);

  const checkSessiontime = (): void => {
    const lastAccessTS =
      lastAccess !== null && lastAccess !== undefined
        ? (lastAccess as number)
        : Date.now() - 1000 * 60 * 60;
    const now = Date.now();
    const sessionExpireInMinutes = 14; // 15min 1min as uncertainty
    const remainingSeconds =
      sessionExpireInMinutes * 60 - Math.floor((now - lastAccessTS) / 1000);


    if (remainingSeconds <= 60) {
      if (interval.current > 1000 && timer.current !== undefined) {
        clearInterval(timer.current);
        interval.current = 1000;
        timer.current = setInterval(checkSessiontime, interval.current);

      }
      if (!ack) {
        setDialog(
          `Session will expire in ${remainingSeconds} seconds. 
          Update session with button OK.`
        );
      }
      if (remainingSeconds <= 0) {
        forcedLogout("You've been logged out due to inactivity");
      }
    } else if (interval.current <= 1000 && timer.current !== undefined) {
      clearInterval(timer.current);
      interval.current = 10000;
      timer.current = setInterval(checkSessiontime, interval.current);

    }
  };

  const forcedLogout = (message: string): void => {
    // const dispatch = useSelector((state: any): any => state.user.username);
    dispatch(setSessionExpired());
    dispatch(logoutUser());
    navigate("/login", { state: { error: message } });
  };

  useEffect(() => {
    timer.current = setInterval(checkSessiontime, interval.current);


    return () => {

      if (timer.current) {
        clearInterval(timer.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastAccess, dialog]);

  const reactivate = async (
    _e: React.SyntheticEvent,
    _val?: string,
    btnText?: string
  ): Promise<void> => {
    if (btnText !== "Close") {
      const response = await apiPOST(
        `Auth/refresh`,
        navigate,
        JSON.stringify({ userName: "admin" }),
        "application/json"
      );

      dispatch(setLastAccess(Date.now()));
      setDialog(undefined);
      if (response?.statusCode === 200) {
        dispatch(refreshToken(response.result.replacedByToken));
      } else {
        forcedLogout("Session is expired");
      }
    } else {
      setAck(true);
      setDialog(undefined);
    }
  };

  if (dialog) {
    return (
      <DefaultDialog
        icon="icon-warning"
        title="Session expired"
        message={dialog}
        buttons={[{ icon: "ok", text: "OK" }]}
        handleButtons={(e, val, btnText): Promise<void> => reactivate(e, val, btnText)}
        show
      />
    );
  }
  return null;
};

export default connect(null, store)(SessionDialog);
