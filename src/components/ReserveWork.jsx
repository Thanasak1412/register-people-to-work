import { ExpandOutline, UserInfo } from '@rsuite/icons';
import { Button } from 'rsuite';
import { mockUsers } from '../_mock/_user';

const defaultData = mockUsers(100);

export default function ReserveWork({ data, onOpenModalBooking }) {
  return (
    <>
      {defaultData.map((_data) => (
        <div key={_data.userId} className="rounded-md bg-sky-400/70 w-10 h-10">
          <Button
            appearance="default"
            id={_data.userId}
            onClick={onOpenModalBooking}
          >
            {!!data.find((user) => Number(user.userId) === _data.userId) ? (
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
