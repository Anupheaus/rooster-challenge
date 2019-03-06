import { FunctionComponent, useState, useEffect, useContext } from 'react';
import { useBound } from 'anux-react-utils';
import { ProfilesContext } from '../profiles';
import api from 'axios';
import { DisplayError } from '../error';
import { IBenefit } from '../../shared/models';
import { IListResponse } from 'anux-exchange';
import { BenefitsContext } from './context';
import { Upsertable } from 'anux-common';

interface IState {
  benefits: IBenefit[];
  error: Error;
}

async function loadBenefits(state: IState, setState: (value: React.SetStateAction<IState>) => void, currentProfileId: string): Promise<void> {
  if (!currentProfileId) { setState({ benefits: [], error: undefined }); }
  const { data: { data: benefits } } = await api.get<IListResponse<IBenefit>>(`/benefits?currentProfileId=${currentProfileId}`);
  setState({ ...state, benefits });
}

export const Provider: FunctionComponent = ({ children }) => {
  const { currentProfileId } = useContext(ProfilesContext);

  const [state, setState] = useState<IState>({
    benefits: [],
    error: undefined,
  });

  const { benefits, error } = state;

  const deleteBenefit = useBound((id: string) => setState({ ...state, benefits: benefits.removeById(id) }));
  const upsertBenefit = useBound((benefit: Upsertable<IBenefit>) => setState({ ...state, benefits: benefits.upsert(benefit) }));

  useEffect(() => {
    loadBenefits(state, setState, currentProfileId).catch((e: Error) => setState({ ...state, error: e }));
  }, [currentProfileId]);

  if (benefits.length > 0 && !error) {
    return (
      <BenefitsContext.Provider value={{ ...state, deleteBenefit, upsertBenefit }}>
        {children || null}
      </BenefitsContext.Provider>
    );
  } else if (benefits.length === 0 && !error) {
    return (
      <div>loading...</div>
    );
  } else {
    return (
      <DisplayError value={error} />
    );
  }
};
