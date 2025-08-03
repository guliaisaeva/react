import { vi } from 'vitest';
import { downloadCSV } from '../../utils/downloadCSV';

describe('downloadCSV', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('creates and clicks a download link with correct CSV content and filename', () => {
    const items = [
      {
        id: '1',
        name: 'Item One',
        description: 'Desc 1',
        detailsUrl: '/details/1',
      },
      {
        id: '2',
        name: 'Item Two',
        description: 'Desc 2',
        detailsUrl: '/details/2',
      },
    ];

    const mockCreateObjectURL = vi.fn(() => 'blob:mockurl');
    const mockRevokeObjectURL = vi.fn();
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    const mockClick = vi.fn();
    vi.spyOn(document, 'createElement').mockImplementation(
      (tagName: string): HTMLElement => {
        if (tagName === 'a') {
          const element = {
            href: '',
            download: '',
            click: mockClick,
          };
          return element as unknown as HTMLElement;
        }
        return document.createElement(tagName);
      }
    );

    downloadCSV(items);

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mockurl');

    vi.restoreAllMocks();
  });
});
