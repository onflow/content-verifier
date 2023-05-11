import * as fcl from "@onflow/fcl";
import "@/app/config";

export const useDotFind = () => {
  const onDotFind = async (address: string) => {
    return await fcl.query({
      cadence: `
      import FIND from 0x35717efbbce11c74
      import Profile from 0x35717efbbce11c74
      
      //Check the status of a fin user
      pub fun main(address: Address) : String?{
      
        let account=getAccount(address)
        let leaseCap = account.getCapability<&FIND.LeaseCollection{FIND.LeaseCollectionPublic}>(FIND.LeasePublicPath)
      
        if !leaseCap.check() {
          return nil
        }
      
        let profile= Profile.find(address).asProfile()
        let leases = leaseCap.borrow()!.getLeaseInformation() 
        var time : UFix64?= nil
        var name :String?= nil
        for lease in leases {
      
          //filter out all leases that are FREE or LOCKED since they are not actice
          if lease.status != "TAKEN" {
            continue
          }
      
          //if we have not set a 
          if profile.findName == "" {
            if time == nil || lease.validUntil < time! {
              time=lease.validUntil
              name=lease.name
            }
          }
      
          if profile.findName == lease.name {
            return lease.name
          }
        }
        return name
      }
      `,
      args: (arg: any, t: any) => [arg(address, t.Address)],
    });
  };

  return {
    onDotFind,
  };
};
