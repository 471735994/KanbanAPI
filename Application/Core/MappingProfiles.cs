using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // 更新活动时忽略 Id，避免源对象的 Id 覆盖数据库主键
            CreateMap<Activity, Activity>().ForMember(dest => dest.Id, opt => opt.Ignore());
            // 创建活动 DTO 映射到 Activity 实体
            CreateMap<CreateActivityDto, Activity>();
            // 编辑活动 DTO 映射到 Activity 实体
            CreateMap<EditActivityDto, Activity>();
        }
    }
}
