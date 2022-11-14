import { useNavigate } from 'react-router-dom';
import { ExpandOutline, UserInfo } from '@rsuite/icons';
import { Button } from 'rsuite';

import useAuth from '../hooks/useAuth';
import { mockUsers } from '../_mock/_user';
import { ROLE_ADMIN } from '../constants';
import { useEffect } from 'react';
import { PATH_AUTH } from '../routes/paths';

const defaultData = mockUsers(100);

export default function ReserveWork({ onOpenModalBooking, checkReserved }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(PATH_AUTH.login);
  }, [navigate, user]);

  return (
    <>
      {defaultData.map((_data) => (
        <div key={_data.userId} className="rounded-md bg-sky-400/70 w-10 h-10">
          <Button
            appearance="default"
            id={_data.userId}
            onClick={onOpenModalBooking}
            disabled={
              !!user &&
              user.role !== ROLE_ADMIN &&
              !!checkReserved(_data.userId)
            }
          >
            {checkReserved(_data.userId) ? (
              <UserInfo className="w-5 h-5" />
            ) : (
              <ExpandOutline className="w-5 h-5" />
            )}
            <div className="text-gray-500 text-xs absolute -top-1 right-2">
              {_data.userId}
            </div>
          </Button>
        </div>
      ))}
    </>
  );
}
