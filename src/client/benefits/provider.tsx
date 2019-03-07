import { FunctionComponent, useState, useEffect, useContext, useRef } from 'react';
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

function storeError(setState: (value: React.SetStateAction<IState>) => void) {
  return (error: Error) => setState(state => ({ ...state, error }));
}

async function saveBenefits(currentProfileId: string, benefits: IBenefit[]) {
  return api.post('/benefits', { currentProfileId, benefits });
}

export const Provider: FunctionComponent = ({ children }) => {
  const { currentProfileId } = useContext(ProfilesContext);

  const [state, setState] = useState<IState>({
    benefits: undefined,
    error: undefined,
  });

  const { benefits, error } = state;

  const deleteBenefit = useBound((id: string) => setState(innerState => ({ ...innerState, benefits: (innerState.benefits || []).removeById(id) })));
  const upsertBenefit = useBound((benefit: Upsertable<IBenefit>) => setState(innerState => ({ ...innerState, benefits: (innerState.benefits || []).upsert(benefit) })));

  useEffect(() => {
    loadBenefits(state, setState, currentProfileId).catch(storeError(setState));
  }, [currentProfileId]);

  const lastBenefits = useRef(benefits);

  useEffect(() => {
    if (benefits == null) { return; }
    if (lastBenefits.current == null) { lastBenefits.current = benefits; return; }
    lastBenefits.current = benefits;
    saveBenefits(currentProfileId, benefits).catch(storeError(setState));
  }, [benefits]);

  if (benefits && !error) {
    return (
      <BenefitsContext.Provider value={{ ...state, deleteBenefit, upsertBenefit }}>
        {children || null}
      </BenefitsContext.Provider>
    );
  } else if (!benefits && !error) {
    return (
      <div>loading...</div>
    );
  } else {
    return (
      <DisplayError value={error} />
    );
  }
};
