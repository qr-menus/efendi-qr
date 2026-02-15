# Cache Busting Setup for Linode

## How It Works

Your app now includes automatic cache busting for images and data. This prevents users from seeing outdated images and prices.

## Files Created/Modified

- **New file**: `src/utils/assetVersion.js` - Contains the cache version constant
- **Modified store**: `src/store/index.js` - Added `assetVersion` to store state
- **Updated components**: All image-loading components now use cache-busted URLs:
  - `FoodCardVertical.vue`
  - `FoodCardHorizontal.vue`
  - `FoodInfo.vue`
  - `FavouriteItem.vue`

## How to Update Cache

When you update images or prices, follow these steps:

1. **Update images** in `/public/images/` folders
2. **Update prices** in `src/data/categories.json`
3. **Increment the version** in `src/utils/assetVersion.js`:

```javascript
export const ASSET_VERSION = "1.0";  // Change to "1.1", "2.0", etc.
```

Or update it in the store at `src/store/index.js`:

```javascript
assetVersion: "1.0",  // Change this value
```

4. **Commit and push** to your `prod` branch
5. Your Linode server will serve the new files with the updated version

## Example

When version is "1.0", images are served as:
```
/images/kebab/kebab_1.webp?v=1.0
```

When you change version to "1.1":
```
/images/kebab/kebab_1.webp?v=1.1
```

Users will see the new content immediately on their next visit.

## Technical Details

- Query parameters force browsers to bypass cache
- Works with Linode's default web server configuration
- Zero server-side changes required
- Completely transparent to users
