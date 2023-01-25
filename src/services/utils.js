export function refactorJsonData(data){
  let branchOrBranches = data?.branch;
  //let slug = payload.slug;
  //slug == '' ? slug = 'main': slug
 // slug == '' ? branchOrBranches = data?.branches[0] : branchOrBranches = data?.branch
  
  return Object.fromEntries(
    Object.entries(branchOrBranches.categories).map(([key, categories]) => {
      return [
        key,
        {
          ...categories,
        }
      ]
    })
  )
}