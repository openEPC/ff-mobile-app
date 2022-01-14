import { cleanup, renderWithNav } from '../utils/testUtils'
import GatewaysScreen from '../features/gateways/root/GatewaysScreen'

afterEach(cleanup)

describe('Test Hotspot Screen', () => {
  it('renders HotspotScreen.tsx', async () => {
    const hotspotScreen = renderWithNav(GatewaysScreen)
    const title = hotspotScreen.findByText('Add a\n[Placeholder] Miner')
    expect(title).toBeDefined()
  })
})
