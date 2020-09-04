import { initialState } from '../initialState';
import { reducer } from '../reducer';

describe('when an action is dispatched', () => {
    describe('and it is a PopulateCampaigns action', () => {
        it('it will add campaigns to the campaigns collection', () => {

            const { campaigns: initialCampaigns, campaignsLoaded: initialCampaignsLoaded, ...otherInitialState } = initialState;
            const state = reducer(initialState, {
                type: 'PopulateCampaigns', payload: [
                    { simpleName: 'simpleName1', title: 'title1', uuid: 'uuid1' },
                    { simpleName: 'simpleName2', title: 'title2', uuid: 'uuid2' }
                ]
            });
            const { campaigns, campaignsLoaded, ...otherState } = state;

            expect(campaigns).toStrictEqual([
                { simpleName: 'simpleName1', title: 'title1', uuid: 'uuid1' },
                { simpleName: 'simpleName2', title: 'title2', uuid: 'uuid2' }
            ]);
            expect(campaignsLoaded).toEqual(true);
            expect(otherState).toStrictEqual(otherInitialState);
        });
    });
});
