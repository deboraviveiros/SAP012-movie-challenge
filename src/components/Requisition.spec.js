import requisition from './Requisition.js';
import movieTest from '../tests/movies.js';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(movieTest)
}));

describe('App', () => {
    it('should render without crashing', () => {
        const el = requisition();
        expect(el instanceof HTMLElement).toBe(true);
    });
});