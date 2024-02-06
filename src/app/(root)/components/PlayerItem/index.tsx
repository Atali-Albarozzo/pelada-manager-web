import { usePlayers } from '@/contexts/PlayersContext';
import { Player } from '@/models/player';
import { PlayerReducerActionTypes } from '@/state/PlayersReducer';
import React, { useEffect, useRef, useState } from 'react';

import {
  RiEdit2Line,
  RiDeleteBin6Line,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiThumbUpFill,
} from 'react-icons/ri';

import { v4 as uuidv4 } from 'uuid';

type PlayerItemPropsType = {
  number: number;
  player: Player;
  newPlayer?: boolean;
  onCancelNewPlayer?: () => void;
};

const before =
  'before:h-8 before:w-8 before:bg-white before:absolute before:-left-[28px] before:top-[5px] before:rotate-45 ';

export default function PlayerItem({
  number,
  player,
  newPlayer = false,
  onCancelNewPlayer,
}: PlayerItemPropsType) {
  const { dispatch } = usePlayers();

  const inputRef = useRef<HTMLInputElement>(null);

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [isNewPlayer, setIsNewPlayer] = useState(newPlayer);

  useEffect(() => {
    if ((editMode || isNewPlayer) && inputRef?.current) {
      inputRef.current.focus();
    }
  }, [editMode, inputRef, isNewPlayer]);

  function handleConfirm() {
    if (editMode) {
      return confirmEdit();
    }

    if (deleteMode) {
      return confirmDelete();
    }

    if (isNewPlayer) {
      return confirmNew();
    }
  }

  function handleCancel() {
    if (isNewPlayer && onCancelNewPlayer) {
      return onCancelNewPlayer();
    }
    setEditMode(false);
    setDeleteMode(false);
  }

  function confirmEdit() {
    dispatch({
      type: PlayerReducerActionTypes.EDIT,
      payload: {
        data: { ...player, id: player.id, name: inputRef!.current!.value },
      },
    });
    setEditMode(false);
  }

  function confirmActive() {
    dispatch({
      type: PlayerReducerActionTypes.EDIT,
      payload: {
        data: { ...player, active: !player.active },
      },
    });
    setEditMode(false);
  }

  function confirmDelete() {
    dispatch({
      type: PlayerReducerActionTypes.DELETE,
      payload: {
        data: player,
      },
    });
    setDeleteMode(false);
  }

  function confirmNew() {
    dispatch({
      type: PlayerReducerActionTypes.ADD,
      payload: {
        data: {
          ...player,
          id: uuidv4(),
          name: inputRef!.current!.value || '<Sem nome>',
          active: true,
        },
      },
    });
    setIsNewPlayer(false);
  }

  const disabledStyle =
    !player.active && !isNewPlayer ? 'bg-gray-300 border-b-gray-400' : '';

  return (
    <li
      className={`relative font-semibold bg-black text-white p-2 pl-6 pr-4 border-b-4 border-b-rose rounded-tr-xl rounded-br-xl mb-1 ${before} ${disabledStyle}`}
    >
      <div className='flex flex-row justify-between items-center'>
        <div className='w-full'>
          <>
            <span className='mr-2'>{`${number}.`}</span>
            {editMode || isNewPlayer ? (
              <input
                ref={inputRef}
                className='text-black px-2 outline-none w-4/5'
                defaultValue={player.name}
                onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
              />
            ) : (
              <span>{player.name}</span>
            )}
          </>
        </div>
        <div className='flex flex-row justify-between'>
          {editMode || deleteMode || isNewPlayer ? (
            <>
              {deleteMode && <span className='mr-2 italic'>Excluir?</span>}
              <RiCloseCircleFill
                size={24}
                className='mr-2'
                onClick={handleCancel}
                color={'red'}
              />
              <RiCheckboxCircleFill
                size={24}
                color={'springgreen'}
                onClick={handleConfirm}
              />
            </>
          ) : (
            <>
              <RiThumbUpFill
                size={20}
                className={`mr-4 ${
                  player.active ? 'rotate-0' : 'rotate-180'
                } transition-all`}
                onClick={confirmActive}
              />

              <RiEdit2Line
                size={20}
                className='mr-4'
                onClick={() => setEditMode(true)}
              />
              <RiDeleteBin6Line size={20} onClick={() => setDeleteMode(true)} />
            </>
          )}
        </div>
      </div>
    </li>
  );
}
