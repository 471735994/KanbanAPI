using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using AutoMapper;

namespace Application.Core
{
    public class MappingProfiles:Profile
    {
        public MappingProfiles()
        {
            // 更新活动时忽略 Id，避免源对象的 Id 覆盖数据库主键
            CreateMap<Activity, Activity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}