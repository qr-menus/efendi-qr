export function refactorJsonData(data){
    return Object.fromEntries(
        Object.entries(data?.branches[0].categories).map(([key, categories]) => {
          return [
            key,
            {
              ...categories,
            }
          ]
        })
      )
}